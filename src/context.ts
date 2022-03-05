import { HealthController, LogController, Logger, Middleware, MiddlewareController, resources } from 'express-ext';
import { createChecker, DB } from 'query-core';
import { TemplateMap } from 'query-mappers';
import { createValidator } from 'xvalidators';
import { UserController, useUserController } from './user';

resources.createValidator = createValidator;

export interface ApplicationContext {
  health: HealthController;
  log: LogController;
  middleware: MiddlewareController;
  user: UserController;
}
export function useContext(db: DB, logger: Logger, midLogger: Middleware, mapper?: TemplateMap): ApplicationContext {
  const log = new LogController(logger);
  const middleware = new MiddlewareController(midLogger);
  const sqlChecker = createChecker(db);
  const health = new HealthController([sqlChecker]);

  const user = useUserController(logger.error, db, mapper);

  return { health, log, middleware, user };
}
