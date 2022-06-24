import {
  HealthController,
  LogController,
  Logger,
  Middleware,
  MiddlewareController,
  resources,
} from "express-ext";
import { createChecker, DB } from "query-core";
import { TemplateMap } from "query-mappers";
import { TouramentController, useTouramentController } from "./tourament";
import { createValidator } from "xvalidators";
import { UserController, useUserController } from "./user";
import { LeagueController } from "league/league-controller";
import { useLeagueController } from "./league";

resources.createValidator = createValidator;

export interface ApplicationContext {
  health: HealthController;
  log: LogController;
  middleware: MiddlewareController;
  user: UserController;
  tourament: TouramentController;
  league: LeagueController;
}
export function useContext(
  db: DB,
  logger: Logger,
  midLogger: Middleware,
  mapper?: TemplateMap
): ApplicationContext {
  const log = new LogController(logger);
  const middleware = new MiddlewareController(midLogger);
  const sqlChecker = createChecker(db);
  const health = new HealthController([sqlChecker]);

  const user = useUserController(logger.error, db, mapper);
  const tourament = useTouramentController(logger.error, db, mapper);
  const league = useLeagueController(logger.error, db, mapper);

  return { health, log, middleware, user, tourament, league };
}
