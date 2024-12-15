import { Request, Response } from "express";
import AsyncMiddleware from 'server/utils/asyncHandler';
import {RegionSearch} from 'services/RegionSearch';
import Success from 'responses/successful/Success';
import { Huyen, Tinh, Xa } from 'types/search-region';
import { QueryRegion, QueryRegionAll } from 'validations/Autocomplete';
import * as console from 'node:console';

export class RegionSearchController {
	public static search = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any, QueryRegion>, res: Response) => {
			try {
				const { group, query } = req.query;
				const groupLabel = {
					tinh: 'Tinh',
					huyen: 'Huyen',
					xa: 'Xa'
				} as const;
				const searchResult = await RegionSearch.search(query, groupLabel[group]);
				const responseModel = searchResult.map((item) =>
					item.result.map(result =>
						RegionSearch.getDetail(result as string, groupLabel[group])
					)
				);
				const response = new Success(responseModel).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error during search: ${error.errorMessage || error.message}`);
				throw error;
			}
		}
	);

	public static getAllRegions = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any, QueryRegionAll>, res: Response) => {
			try {
				const { group, target } = req.query;
				let result;
				let searchResult;
				if (group === 'tinh') {
					searchResult = RegionSearch.parseStoreAsArray('Tinh')
						.map((tinh: Tinh) => ({
							value: tinh.TenTinh,
							ref: tinh.TinhId,
							id: tinh.TinhId
						}));

					result = {
						result: searchResult
					}
				} else if (group === 'huyen') {
					const targetResult = RegionSearch.getDetail(target || '', 'Tinh');
					if (!targetResult) {
						searchResult = [];
					} else {
						searchResult = RegionSearch.parseStoreAsArray('Huyen')
							.filter((huyen: Huyen) => huyen.TinhId === targetResult.TinhId)
							.map((huyen: Huyen) => ({
								value: huyen.TenHuyen,
								ref: targetResult?.TinhId || null,
								id: huyen.HuyenId
							}));
					}
					result = {
						refType: 'tinh',
						result: searchResult
					};
				} else if (group === 'xa') {
					const targetResult = RegionSearch.getDetail(target || '', 'Huyen');
					if (!targetResult) {
						searchResult = [];
					} else {
						searchResult = RegionSearch.parseStoreAsArray('Xa')
							.filter((xa: Xa) => xa.HuyenId === targetResult.HuyenId)
							.map((xa: Xa) => ({
								value: xa.TenXa,
								ref: targetResult?.HuyenId || null,
								id: xa.TenXa
							}));
					}
					result = {
						ref: targetResult?.HuyenId || null,
						refType: 'huyen',
						result: searchResult
					};
				} else {
					result = [];
				}
				const response = new Success(result).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error during search: ${error.errorMessage || error.message}`);
				throw error;
			}
		}
	);
}