import { Router } from 'express';
import * as questionController from '@/api/v1/internal/question/controller';

/**
 * @summary
 * Internal (authenticated) API routes configuration
 *
 * @module routes/v1/internalRoutes
 *
 * @description
 * Defines all authenticated API endpoints
 * Base URL: /api/v1/internal
 */

const router = Router();

/**
 * @summary
 * Question management routes
 */
router.get('/question', questionController.listHandler);
router.post('/question', questionController.createHandler);
router.get('/question/:id', questionController.getHandler);
router.put('/question/:id', questionController.updateHandler);
router.delete('/question/:id', questionController.deleteHandler);

export default router;
