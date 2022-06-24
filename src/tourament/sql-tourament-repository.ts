import { DB, Repository } from "query-core";
import { Tourament, touramentModel, TouramentRepository } from "./tourament";

export class SqlTouramentRepository
  extends Repository<Tourament, string>
  implements TouramentRepository
{
  constructor(db: DB) {
    super(db, "touraments", touramentModel);
  }
}
