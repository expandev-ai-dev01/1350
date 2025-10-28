import { Router } from 'express';
import externalRoutes from './externalRoutes';
import internalRoutes from './internalRoutes';

/**
 * @summary
 * V1 API router configuration
 *
 * @module routes/v1
 *
 * @description
 * Organizes V1 API routes into external (public) and internal (authenticated) sections
 */

const router = Router();

/**
 * @summary
 * External (public) routes
 *
 * @description
 * Mounts public API endpoints under /external prefix
 * URL pattern: /api/v1/external/...
 */
router.use('/external', externalRoutes);

/**
 * @summary
 * Internal (authenticated) routes
 *
 * @description
 * Mounts authenticated API endpoints under /internal prefix
 * URL pattern: /api/v1/internal/...
 */
router.use('/internal', internalRoutes);

export default router;
