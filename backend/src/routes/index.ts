import { Router } from 'express';
import v1Routes from './v1';

/**
 * @summary
 * Main API router with version management
 *
 * @module routes
 *
 * @description
 * Configures API versioning and routes all requests to appropriate version handlers
 */

const router = Router();

/**
 * @summary
 * Version 1 routes (current stable)
 *
 * @description
 * Mounts all v1 API endpoints under /v1 prefix
 */
router.use('/v1', v1Routes);

/**
 * @summary
 * Future versions can be added here
 *
 * @example
 * router.use('/v2', v2Routes);
 */

export default router;
