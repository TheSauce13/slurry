// Roll d10 (1–10). Success if roll <= statValue + modifier.
export function statCheck(statValue, modifier = 0) {
  const roll = Math.ceil(Math.random() * 10);
  return { success: roll <= (statValue + modifier), roll };
}
