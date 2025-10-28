import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS, ERROR_CODES } from '@/constants';
import {
  questionCreate,
  questionList,
  questionGet,
  questionUpdate,
  questionDelete,
  QuestionType,
  DifficultyLevel,
} from '@/services/question';

/**
 * @api {get} /internal/question List Questions
 * @apiName ListQuestions
 * @apiGroup Question
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all questions created by the professor with optional filters
 *
 * @apiParam {String} [tipo] Question type filter
 * @apiParam {String} [tema] Geographic theme filter
 * @apiParam {String} [dificuldade] Difficulty level filter
 *
 * @apiSuccess {Array} data List of questions
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const idProfessor = 'mock-professor-id';
    const { tipo, tema, dificuldade } = req.query;

    const questions = await questionList(
      idProfessor,
      tipo as QuestionType,
      tema as string,
      dificuldade as string
    );

    res.json(successResponse(questions));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {post} /internal/question Create Question
 * @apiName CreateQuestion
 * @apiGroup Question
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new question in the question bank
 *
 * @apiParam {String} tipo_questao Question type
 * @apiParam {String} enunciado Question statement
 * @apiParam {String} nivel_dificuldade Difficulty level
 * @apiParam {String} tema_geografico Geographic theme
 * @apiParam {Number} valor_pontos Point value
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const bodySchema = z.object({
      tipo_questao: z.nativeEnum(QuestionType),
      enunciado: z.string().min(10).max(1000),
      nivel_dificuldade: z.nativeEnum(DifficultyLevel),
      tema_geografico: z.string().min(1).max(200),
      alternativas: z
        .array(
          z.object({
            text: z.string(),
            isCorrect: z.boolean(),
          })
        )
        .min(2)
        .max(5)
        .optional(),
      afirmacao: z.string().min(10).max(500).optional(),
      resposta_correta: z.boolean().optional(),
      colunas: z
        .object({
          coluna_a: z.array(z.string()).min(2).max(5),
          coluna_b: z.array(z.string()).min(2).max(5),
          correct_mapping: z.record(z.string()),
        })
        .optional(),
      mapa: z
        .object({
          image_url: z.string().url(),
          clickable_regions: z.array(
            z.object({
              coordinates: z.array(z.number()),
              correct_name: z.string(),
            })
          ),
        })
        .optional(),
      recursos_multimidia: z
        .array(
          z.object({
            type: z.enum(['image', 'video', 'audio']),
            url: z.string().url(),
          })
        )
        .optional(),
      valor_pontos: z.number().positive().default(1.0),
    });

    const validated = bodySchema.parse(req.body);
    const idProfessor = 'mock-professor-id';

    if (validated.tipo_questao === QuestionType.MultipleChoice && !validated.alternativas) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(
          errorResponse(
            'Questões de múltipla escolha devem ter alternativas',
            ERROR_CODES.VALIDATION_ERROR
          )
        );
      return;
    }

    if (
      validated.tipo_questao === QuestionType.TrueFalse &&
      (validated.afirmacao === undefined || validated.resposta_correta === undefined)
    ) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(
          errorResponse(
            'Questões de verdadeiro/falso devem ter afirmação e resposta correta',
            ERROR_CODES.VALIDATION_ERROR
          )
        );
      return;
    }

    if (validated.tipo_questao === QuestionType.ColumnMatching && !validated.colunas) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(
          errorResponse(
            'Questões de associação devem ter colunas definidas',
            ERROR_CODES.VALIDATION_ERROR
          )
        );
      return;
    }

    if (validated.tipo_questao === QuestionType.InteractiveMap && !validated.mapa) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(
          errorResponse(
            'Questões de mapa interativo devem ter dados do mapa',
            ERROR_CODES.VALIDATION_ERROR
          )
        );
      return;
    }

    const question = await questionCreate(validated, idProfessor);

    res.status(HTTP_STATUS.CREATED).json(successResponse(question));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Dados inválidos', ERROR_CODES.VALIDATION_ERROR, error.errors));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /internal/question/:id Get Question
 * @apiName GetQuestion
 * @apiGroup Question
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a specific question by ID
 *
 * @apiParam {String} id Question identifier
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const idProfessor = 'mock-professor-id';

    const question = await questionGet(id, idProfessor);

    if (!question) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json(errorResponse('Questão não encontrada', ERROR_CODES.NOT_FOUND));
      return;
    }

    res.json(successResponse(question));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {put} /internal/question/:id Update Question
 * @apiName UpdateQuestion
 * @apiGroup Question
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates an existing question
 *
 * @apiParam {String} id Question identifier
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const idProfessor = 'mock-professor-id';

    const bodySchema = z.object({
      tipo_questao: z.nativeEnum(QuestionType).optional(),
      enunciado: z.string().min(10).max(1000).optional(),
      nivel_dificuldade: z.nativeEnum(DifficultyLevel).optional(),
      tema_geografico: z.string().min(1).max(200).optional(),
      alternativas: z
        .array(
          z.object({
            text: z.string(),
            isCorrect: z.boolean(),
          })
        )
        .min(2)
        .max(5)
        .optional(),
      afirmacao: z.string().min(10).max(500).optional(),
      resposta_correta: z.boolean().optional(),
      colunas: z
        .object({
          coluna_a: z.array(z.string()).min(2).max(5),
          coluna_b: z.array(z.string()).min(2).max(5),
          correct_mapping: z.record(z.string()),
        })
        .optional(),
      mapa: z
        .object({
          image_url: z.string().url(),
          clickable_regions: z.array(
            z.object({
              coordinates: z.array(z.number()),
              correct_name: z.string(),
            })
          ),
        })
        .optional(),
      recursos_multimidia: z
        .array(
          z.object({
            type: z.enum(['image', 'video', 'audio']),
            url: z.string().url(),
          })
        )
        .optional(),
      valor_pontos: z.number().positive().optional(),
    });

    const validated = bodySchema.parse(req.body);

    const question = await questionUpdate(id, idProfessor, validated);

    if (!question) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json(errorResponse('Questão não encontrada', ERROR_CODES.NOT_FOUND));
      return;
    }

    res.json(successResponse(question));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Dados inválidos', ERROR_CODES.VALIDATION_ERROR, error.errors));
      return;
    }
    next(error);
  }
}

/**
 * @api {delete} /internal/question/:id Delete Question
 * @apiName DeleteQuestion
 * @apiGroup Question
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes a question
 *
 * @apiParam {String} id Question identifier
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const idProfessor = 'mock-professor-id';

    const deleted = await questionDelete(id, idProfessor);

    if (!deleted) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json(errorResponse('Questão não encontrada', ERROR_CODES.NOT_FOUND));
      return;
    }

    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (error: any) {
    next(error);
  }
}
