const Joi = require("@hapi/joi");

require("dotenv").config();

const envVarsSchema = Joi.object({
    ...process.env,
    NODE_ENV : Joi.string()
        .allow(['development','production','test'])
        .default('development'),
    PORT: Joi.number()
        .default(3090),
    MONGOOSE_DEBUG: Joi.boolean()
        .when('NODE_ENV', {
          is: Joi.string().equal('development'),
          then: Joi.boolean().default(true),
          otherwise: Joi.boolean().default(false)
        }),
    JWT_SECRET: Joi.string().required()
        .description('JWT Secret required to sign'),
    MONGO_HOST: Joi.string().required()
        .description('Mongo DB host url'),
    MONGO_PORT: Joi.number()
        .default(27017)
})

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    jwtSecret: envVars.JWT_SECRET,
    mongo: {
      host: envVars.MONGO_HOST,
      port: envVars.MONGO_PORT
    }
  };
  
module.exports = config;