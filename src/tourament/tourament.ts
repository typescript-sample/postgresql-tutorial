import { Attributes, DateRange, Filter, Repository, Service } from "onecore";

export interface Tourament {
  id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  kind: string;
  status: string;
  leagueId: string;
}

export interface TouramentRepository extends Repository<Tourament, string> {}

export interface TouramentService
  extends Service<Tourament, string, TouramentFilter> {}

export const touramentModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  name: {
    required: true,
  },
  description: {},
  startDate: {},
  endDate: {},
  kind: {},
  status: {},
  leagueId: {},
};

export interface TouramentFilter extends Filter {
  id: string;
  name: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  kind: string;
  status: string;
  leagueId: string;
}
