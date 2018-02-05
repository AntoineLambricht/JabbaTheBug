import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
      .allow(['development', 'production'])
      .default('development'),
    SERVER_PORT: Joi.number()
      .default(4040),
    MONGOOSE_DEBUG: Joi.boolean()
      .when('NODE_ENV', {
        is: Joi.string().equal('development'),
        then: Joi.boolean().default(true),
        otherwise: Joi.boolean().default(false)
      }),
    MONGO_HOST: Joi.string().required()
      .description('Mongo DB host url'),
    MONGO_PORT: Joi.number()
      .default(27017),
  
    PORT: Joi.number(),
    MONGODB_URI: Joi.string(),
  
  }).unknown()
    .required();
  
  const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
  
  const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT || envVars.SERVER_PORT,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    mongoUri: envVars.MONGODB_URI,
    mongo: {
      host: envVars.MONGO_HOST,
      port: envVars.MONGO_PORT
    }
  };
  
  export default config;