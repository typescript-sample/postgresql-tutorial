import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
import { TemplateMap, useQuery } from "query-mappers";

export { TouramentController };
import { SqlTouramentRepository } from "./sql-tourament-repository";
import {
  Tourament,
  TouramentFilter,
  touramentModel,
  TouramentRepository,
  TouramentService,
} from "./tourament";
import { TouramentController } from "./tourament-controller";

export class TouramentManager
  extends Manager<Tourament, string, TouramentFilter>
  implements TouramentService
{
  constructor(
    search: Search<Tourament, TouramentFilter>,
    repository: TouramentRepository
  ) {
    super(search, repository);
  }
}
export function useTouramentService(
  db: DB,
  mapper?: TemplateMap
): TouramentService {
  const query = useQuery("tourament", mapper, touramentModel, true);
  const builder = new SearchBuilder<Tourament, TouramentFilter>(
    db.query,
    "touraments",
    touramentModel,
    postgres,
    query
  );
  const repository = new SqlTouramentRepository(db);
  return new TouramentManager(builder.search, repository);
}
export function useTouramentController(
  log: Log,
  db: DB,
  mapper?: TemplateMap
): TouramentController {
  return new TouramentController(log, useTouramentService(db, mapper));
}
