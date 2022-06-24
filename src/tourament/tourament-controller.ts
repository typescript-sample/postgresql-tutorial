import { Controller, Log } from "express-ext";
import { Tourament, TouramentFilter, TouramentService } from "./tourament";

export class TouramentController extends Controller<
  Tourament,
  string,
  TouramentFilter
> {
  constructor(log: Log, touramentService: TouramentService) {
    super(log, touramentService);
  }
}
