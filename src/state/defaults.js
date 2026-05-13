export const STAT_NAMES = ['brawn', 'graft', 'wit', 'brass', 'guts', 'lurk'];
export const STAT_MIN = 2;
export const STAT_MAX = 8;
export const STAT_BUDGET = 30;

export const COIN_BY_OCCUPATION = {
  canal_worker: 3,
  trader:       6,
  layabout:     2,
  soldier:      4,
  clerk:        5,
};

// { honour bonus, stat bonus }
export const PAST_DECISION_EFFECTS = {
  left_behind: { honour: 4,  statBonus: 'guts' },
  gave_away:   { honour: 16, statBonus: 'brass' },
  took_credit: { honour: 10, statBonus: 'wit' },
  nothing:     { honour: 10, statBonus: null },
};

export function defaultGameState() {
  return {
    character: {
      name:         '',
      origin:       '',
      occupation:   '',
      weapon:       '',
      pastDecision: '',
      stats: {
        brawn: 5,
        graft: 5,
        wit:   5,
        brass: 5,
        guts:  5,
        lurk:  5,
      },
    },
    resources: {
      health:     10,
      coin:       0,
      reputation: 5,
      honour:     10,
    },
    flags: {
      beat2Ally:          false,
      beat3Item:          null,
      tollmasterRelation: null,
      workedThisBeat:     false,
    },
    progress: {
      chapter:  1,
      beat:     0,
      complete: false,
    },
    history: [],
  };
}
