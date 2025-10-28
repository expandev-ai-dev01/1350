/**
 * @service questionService
 * @summary Question management service for authenticated endpoints
 * @domain question
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/question/...
 *
 * Authentication token is automatically added by interceptor.
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Question, CreateQuestionDto, UpdateQuestionDto, QuestionListParams } from '../types';

export const questionService = {
  /**
   * @endpoint GET /api/v1/internal/question
   * @summary Fetches list of questions with filters
   */
  async list(params?: QuestionListParams): Promise<Question[]> {
    const response = await authenticatedClient.get('/question', { params });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/question/:id
   * @summary Fetches single question by ID
   */
  async getById(id: string): Promise<Question> {
    const response = await authenticatedClient.get(`/question/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/question
   * @summary Creates new question
   */
  async create(data: CreateQuestionDto): Promise<Question> {
    const response = await authenticatedClient.post('/question', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/question/:id
   * @summary Updates existing question
   */
  async update(id: string, data: UpdateQuestionDto): Promise<Question> {
    const response = await authenticatedClient.put(`/question/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/question/:id
   * @summary Deletes question
   */
  async delete(id: string): Promise<void> {
    await authenticatedClient.delete(`/question/${id}`);
  },
};
