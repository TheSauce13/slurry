// Filter beat options based on state flags and stat gating — Loop 3+
export function getAvailableOptions(beat, state) {
  return beat.options.filter(opt => {
    if (opt.requiresFlag) return state.flags[opt.requiresFlag] === true;
    return true;
  });
}
