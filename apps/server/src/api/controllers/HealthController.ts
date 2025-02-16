import { Request, Response } from "express";
import prisma from "repository/prisma";
import Success from 'responses/successful/Success.ts';

export class HealthController {
	public static async checkHealthDB(req: Request, res: Response): Promise<void> {
		try {
			const tableNames = await prisma.$queryRaw<{table_name: string}[]>`
			SELECT table_name
			FROM information_schema.tables
			WHERE table_schema = 'public'
			`;

			const response = new Success(tableNames);
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ message: "Database is unhealthy" });
		}
	}
}