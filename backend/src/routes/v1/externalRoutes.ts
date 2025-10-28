import { Router } from 'express';

/**
 * @summary
 * External (public) API routes configuration
 *
 * @module routes/v1/externalRoutes
 *
 * @description
 * Defines all public API endpoints that do not require authentication
 * Base URL: /api/v1/external
 */

const router = Router();

/**
 * @summary
 * Public routes will be added here as features are implemented
 *
 * @example
 * import publicController from '@/api/v1/external/public/controller';
 * router.get('/public/info', publicController.getHandler);
 */

export default router;
