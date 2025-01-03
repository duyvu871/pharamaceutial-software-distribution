export type RewardPointSchema = {
	point: number;
	description: string;
	convert_to: string; // enum vnd, usd, eur
	convert_rate: number; // 1 point = convert_rate convert_to
}

export type CurrentRewardPointSchema = {
	point_to_convert: number; // point to convert
	point_remain: number;
	userId: string;
	username: string;
}

export type RewardPointResponse = {
	id: string
	consumerId: string
	storeId: string | null
	totalPoints: number
	createdAt: string
	updatedAt: string
}