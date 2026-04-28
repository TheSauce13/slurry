const TIERS = [
  { min: 18, label: 'Righteous Soul' },
  { min: 14, label: 'Decent Sort' },
  { min: 10, label: 'Mixed Reputation' },
  { min: 6,  label: 'Known Scoundrel' },
  { min: 2,  label: 'Villain of the Parish' },
  { min: 0,  label: 'Beyond Redemption' },
];

export function getAlignmentLabel(honour) {
  return TIERS.find(t => honour >= t.min)?.label ?? 'Beyond Redemption';
}
