import { Monster, WeightCategoryType } from "@store/monsters/monsters.model";
import { MatchMessage } from "@store/notifications/notifications.model";
import { Arena } from "ffc-prisma-package/dist/client";

export interface Matches {
  matches: Match[];
}

export type MatchWaitingListStatus = "ACCEPTED" | "REJECTED" | "PENDING";

export interface MatchWaitingList {
  id: number;
  Match: Match;
  fk_match: number;
  Monster: Monster;
  fk_monster: number;
  status: MatchWaitingListStatus;
}

export interface Match {
  id: number;
  Monster1: Monster;
  Monster2: Monster;
  fk_monster1: number;
  fk_monster2: number;
  matchStartDate: Date;
  matchEndDate: Date;
  MatchWaitingList: MatchWaitingList[];
  Arena: Arena;
  fk_arena: number;
  MatchMessage: MatchMessage[];
  weight_category: WeightCategoryType;
  Transaction: {
    Wallet: {
      User: {
        firstname: string;
        lastname: string;
      };
    };
    Monster: {
      name: Monster["name"];
    };
    amount: number;
  }[];
}

export interface PlaceBet {
  matchId: number;
  monster: number;
  amount: number;
}
