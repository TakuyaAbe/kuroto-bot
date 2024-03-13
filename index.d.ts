declare module "node:process" {
	global {
		namespace NodeJS {
			interface ProcessEnv {
				ANTHROPIC_API_KEY: string;
				TWITTER_API_KEY: string;
				TWITTER_API_KEY_SECRET: string;
				TWITTER_BEARER_TOKEN: string;
				TWITTER_ACCESS_TOKEN: string;
				TWITTER_ACCESS_TOKEN_SECRET: string;
			}
		}
	}
}
