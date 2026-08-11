export interface Interaction {
  exit?: boolean;
  heroHit?: boolean;
  health?: number | undefined;
  heroHeal?: boolean;
  heroStop?: boolean;
  coinLoot?: boolean;
  coinLost?: boolean;
  coins?: number | undefined;
  key?: boolean;
  endurance?: boolean;
  teleport?: boolean;
  goTo?: number;
}
