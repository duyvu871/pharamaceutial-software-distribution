export type CookieAccessToken = {
	userId: string;
	accessToken: {
		access_token: string;
		expire_access_token: number;
		token_type: string;
		refresh_token: string;
		expire_refresh_token: number;
	};
}