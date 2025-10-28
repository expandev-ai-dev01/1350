import { Router } from 'express';

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
 * Authenticated routes will be added here as features are implemented
 *
 * @example
 * import orderController from '@/api/v1/internal/order/controller';
 * router.get('/order', authMiddleware, orderController.listHandler);
 * router.post('/order', authMiddleware, orderController.createHandler);
 */

export default router;
