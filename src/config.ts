import joi from 'joi';
import { EnvType } from './g.types';
import dotenv from "dotenv";

dotenv.config({
	path: process.env.NODE_ENV == 'development' ? '.env.dev' : '.env.locals',
});

const envVarSchema = joi.object({
	NODE_ENV: joi
		.string()
		.valid(...Object.values(EnvType))
		.default(EnvType.DEVELOPMENT),

	TELEGRAM_API_KEY: joi
		.string(),
	MONGO_URL: joi
		.string()
		.required()
		.description('Mongo DB host url'),
	FPL_URL: joi
		.string()
		.required()
		.description('FPL url'),
})
	.unknown()
	.required()
/* Validating the environment variables. */
const { error, value: envVars, } = envVarSchema
	.prefs(
		{
			errors: { label: 'key', },
			abortEarly: false,
		} //
	)
	.validate(process.env);
if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

//
const config = {
	env: envVars.NODE_ENV,
	TELEGRAM_API_KEY: envVars.TELEGRAM_API_KEY,
	MONGO_URL: envVars.MONGO_URL,
	FPL_URL: envVars.FPL_URL,

}
export default config;
