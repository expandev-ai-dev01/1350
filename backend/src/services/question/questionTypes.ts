/**
 * @summary
 * Question service type definitions
 *
 * @module services/question/questionTypes
 *
 * @description
 * Type definitions for question management operations
 */

/**
 * @enum QuestionType
 * @description Types of questions supported by the system
 */
export enum QuestionType {
  MultipleChoice = 'multipla_escolha',
  TrueFalse = 'verdadeiro_falso',
  ColumnMatching = 'associacao_colunas',
  InteractiveMap = 'mapa_interativo',
}

/**
 * @enum DifficultyLevel
 * @description Difficulty levels for questions
 */
export enum DifficultyLevel {
  Easy = 'facil',
  Medium = 'medio',
  Hard = 'dificil',
}

/**
 * @interface Alternative
 * @description Structure for multiple choice alternatives
 */
export interface Alternative {
  text: string;
  isCorrect: boolean;
}

/**
 * @interface ColumnMatchingData
 * @description Structure for column matching questions
 */
export interface ColumnMatchingData {
  coluna_a: string[];
  coluna_b: string[];
  correct_mapping: { [key: string]: string };
}

/**
 * @interface InteractiveMapData
 * @description Structure for interactive map questions
 */
export interface InteractiveMapData {
  image_url: string;
  clickable_regions: Array<{
    coordinates: number[];
    correct_name: string;
  }>;
}

/**
 * @interface MultimediaResource
 * @description Structure for multimedia resources
 */
export interface MultimediaResource {
  type: 'image' | 'video' | 'audio';
  url: string;
}

/**
 * @interface QuestionCreateRequest
 * @description Request structure for creating a question
 */
export interface QuestionCreateRequest {
  tipo_questao: QuestionType;
  enunciado: string;
  nivel_dificuldade: DifficultyLevel;
  tema_geografico: string;
  alternativas?: Alternative[];
  afirmacao?: string;
  resposta_correta?: boolean;
  colunas?: ColumnMatchingData;
  mapa?: InteractiveMapData;
  recursos_multimidia?: MultimediaResource[];
  valor_pontos: number;
}

/**
 * @interface QuestionEntity
 * @description Question entity structure
 */
export interface QuestionEntity {
  id_questao: string;
  tipo_questao: QuestionType;
  enunciado: string;
  nivel_dificuldade: DifficultyLevel;
  tema_geografico: string;
  alternativas?: Alternative[];
  afirmacao?: string;
  resposta_correta?: boolean;
  colunas?: ColumnMatchingData;
  mapa?: InteractiveMapData;
  recursos_multimidia?: MultimediaResource[];
  valor_pontos: number;
  data_criacao: Date;
  id_professor: string;
}

/**
 * @interface QuestionListResponse
 * @description Response structure for question list
 */
export interface QuestionListResponse {
  id_questao: string;
  tipo_questao: QuestionType;
  enunciado: string;
  nivel_dificuldade: DifficultyLevel;
  tema_geografico: string;
  valor_pontos: number;
  data_criacao: Date;
}
