import { Router } from "express";
import { HealthController } from 'controllers/HealthController.ts';

export const healthCheckRouter = Router();

healthCheckRouter.route("/health/check-db").get(
	HealthController.checkHealthDB
);
