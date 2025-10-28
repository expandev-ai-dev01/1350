/**
 * @summary
 * Question business logic operations
 *
 * @module services/question/questionLogic
 *
 * @description
 * Business logic for question management without database persistence
 */

import { v4 as uuidv4 } from 'uuid';
import {
  QuestionCreateRequest,
  QuestionEntity,
  QuestionListResponse,
  QuestionType,
} from './questionTypes';

/**
 * @summary
 * In-memory storage for questions
 */
const questions: QuestionEntity[] = [];

/**
 * @summary
 * Creates a new question
 *
 * @function questionCreate
 *
 * @param {QuestionCreateRequest} params - Question creation parameters
 * @param {string} idProfessor - Professor identifier
 *
 * @returns {Promise<QuestionEntity>} Created question entity
 *
 * @throws {Error} When validation fails
 */
export async function questionCreate(
  params: QuestionCreateRequest,
  idProfessor: string
): Promise<QuestionEntity> {
  const newQuestion: QuestionEntity = {
    id_questao: uuidv4(),
    ...params,
    data_criacao: new Date(),
    id_professor: idProfessor,
  };

  questions.push(newQuestion);
  return newQuestion;
}

/**
 * @summary
 * Lists questions with optional filters
 *
 * @function questionList
 *
 * @param {string} idProfessor - Professor identifier
 * @param {QuestionType} [tipo] - Filter by question type
 * @param {string} [tema] - Filter by geographic theme
 * @param {string} [dificuldade] - Filter by difficulty level
 *
 * @returns {Promise<QuestionListResponse[]>} List of questions
 */
export async function questionList(
  idProfessor: string,
  tipo?: QuestionType,
  tema?: string,
  dificuldade?: string
): Promise<QuestionListResponse[]> {
  let filtered = questions.filter((q) => q.id_professor === idProfessor);

  if (tipo) {
    filtered = filtered.filter((q) => q.tipo_questao === tipo);
  }

  if (tema) {
    filtered = filtered.filter((q) => q.tema_geografico === tema);
  }

  if (dificuldade) {
    filtered = filtered.filter((q) => q.nivel_dificuldade === dificuldade);
  }

  return filtered.map((q) => ({
    id_questao: q.id_questao,
    tipo_questao: q.tipo_questao,
    enunciado: q.enunciado,
    nivel_dificuldade: q.nivel_dificuldade,
    tema_geografico: q.tema_geografico,
    valor_pontos: q.valor_pontos,
    data_criacao: q.data_criacao,
  }));
}

/**
 * @summary
 * Gets a specific question by ID
 *
 * @function questionGet
 *
 * @param {string} idQuestao - Question identifier
 * @param {string} idProfessor - Professor identifier
 *
 * @returns {Promise<QuestionEntity | null>} Question entity or null
 */
export async function questionGet(
  idQuestao: string,
  idProfessor: string
): Promise<QuestionEntity | null> {
  const question = questions.find(
    (q) => q.id_questao === idQuestao && q.id_professor === idProfessor
  );

  return question || null;
}

/**
 * @summary
 * Updates an existing question
 *
 * @function questionUpdate
 *
 * @param {string} idQuestao - Question identifier
 * @param {string} idProfessor - Professor identifier
 * @param {Partial<QuestionCreateRequest>} params - Update parameters
 *
 * @returns {Promise<QuestionEntity | null>} Updated question or null
 */
export async function questionUpdate(
  idQuestao: string,
  idProfessor: string,
  params: Partial<QuestionCreateRequest>
): Promise<QuestionEntity | null> {
  const index = questions.findIndex(
    (q) => q.id_questao === idQuestao && q.id_professor === idProfessor
  );

  if (index === -1) {
    return null;
  }

  questions[index] = {
    ...questions[index],
    ...params,
  };

  return questions[index];
}

/**
 * @summary
 * Deletes a question
 *
 * @function questionDelete
 *
 * @param {string} idQuestao - Question identifier
 * @param {string} idProfessor - Professor identifier
 *
 * @returns {Promise<boolean>} True if deleted, false otherwise
 */
export async function questionDelete(idQuestao: string, idProfessor: string): Promise<boolean> {
  const index = questions.findIndex(
    (q) => q.id_questao === idQuestao && q.id_professor === idProfessor
  );

  if (index === -1) {
    return false;
  }

  questions.splice(index, 1);
  return true;
}
