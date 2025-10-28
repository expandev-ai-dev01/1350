/**
 * @module QuestionTypes
 * @summary Type definitions for question domain
 * @domain question
 * @category types
 */

export enum QuestionType {
  MultipleChoice = 'multipla_escolha',
  TrueFalse = 'verdadeiro_falso',
  ColumnMatching = 'associacao_colunas',
  InteractiveMap = 'mapa_interativo',
}

export enum DifficultyLevel {
  Easy = 'facil',
  Medium = 'medio',
  Hard = 'dificil',
}

export interface Alternative {
  text: string;
  isCorrect: boolean;
}

export interface ColumnMatching {
  coluna_a: string[];
  coluna_b: string[];
  correct_mapping: Record<string, string>;
}

export interface InteractiveMap {
  image_url: string;
  clickable_regions: {
    coordinates: number[];
    correct_name: string;
  }[];
}

export interface MultimediaResource {
  type: 'image' | 'video' | 'audio';
  url: string;
}

export interface Question {
  id_questao: string;
  tipo_questao: QuestionType;
  enunciado: string;
  nivel_dificuldade: DifficultyLevel;
  tema_geografico: string;
  alternativas?: Alternative[];
  afirmacao?: string;
  resposta_correta?: boolean;
  colunas?: ColumnMatching;
  mapa?: InteractiveMap;
  recursos_multimidia?: MultimediaResource[];
  valor_pontos: number;
  data_criacao: string;
  id_professor: string;
}

export interface CreateQuestionDto {
  tipo_questao: QuestionType;
  enunciado: string;
  nivel_dificuldade: DifficultyLevel;
  tema_geografico: string;
  alternativas?: Alternative[];
  afirmacao?: string;
  resposta_correta?: boolean;
  colunas?: ColumnMatching;
  mapa?: InteractiveMap;
  recursos_multimidia?: MultimediaResource[];
  valor_pontos?: number;
}

export interface UpdateQuestionDto {
  tipo_questao?: QuestionType;
  enunciado?: string;
  nivel_dificuldade?: DifficultyLevel;
  tema_geografico?: string;
  alternativas?: Alternative[];
  afirmacao?: string;
  resposta_correta?: boolean;
  colunas?: ColumnMatching;
  mapa?: InteractiveMap;
  recursos_multimidia?: MultimediaResource[];
  valor_pontos?: number;
}

export interface QuestionListParams {
  tipo?: QuestionType;
  tema?: string;
  dificuldade?: DifficultyLevel;
}
