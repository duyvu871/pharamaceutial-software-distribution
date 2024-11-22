declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_API_HOST: string;
			BASE_HOST: string;
		}
	}
}

export {};