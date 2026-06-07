export interface GameState {
  coins: number;
  energy: number;
  maxEnergy: number;
  level: number;
  totalClicks: number;
  lastEnergyRefillTime: number;
  upgrades: Upgrade[];
  passiveIncome: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
  type: 'clickPower' | 'energy' | 'passive' | 'energyRegen';
  value: number;
  icon: string;
}

export interface GameConfig {
  initialCoins: number;
  initialEnergy: number;
  maxEnergy: number;
  energyCostPerClick: number;
  coinPerClick: number;
  energyRegenRate: number;
  energyRegenDelay: number;
}

export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}