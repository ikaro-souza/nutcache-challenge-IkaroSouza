import * as Joi from 'joi'

const DEFAULT_PORT = 3000

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  CRUD_API_URL: Joi.string().exist(),
})

export const configuration = () => ({
  [configKeys.port]: parseInt(process.env.PORT, 10) || DEFAULT_PORT,
  [configKeys.crudApiUrl]: process.env.CRUD_API_URL,
})

export const configKeys = {
  crudApiUrl: 'crudApiUrl',
  port: 'port',
}
