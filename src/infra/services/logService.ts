import { LogMongoRepository } from '../log'

export const logError = (): LogMongoRepository => new LogMongoRepository()

