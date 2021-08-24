import { LogErrorRepository } from './log-error-repository'

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    console.log('log mongo error - ' + stack)

    console.log(stack)
    // const errorCollection = await MongoHelper.getCollection('errors')
    // await errorCollection.insertOne({
    //   stack,
    //   date: new Date()
    // })
  }
}
