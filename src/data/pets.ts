export interface PetRecord {
  name: string;
  biome: string;
  rarity: string;
  income: number;
  incomeLabel: string;
  evidence: 'Cross-checked' | 'Community tracked';
}

/**
 * Conservative launch dataset. These are records that appeared consistently
 * in recent public indexes checked on 2026-08-26. The live in-game Pet Index
 * remains authoritative because updates can change names, totals, and rates.
 */
export const PETS: PetRecord[] = [
  { name: 'Chicken', biome: 'Forest', rarity: 'Common', income: 1, incomeLabel: '$1/s', evidence: 'Cross-checked' },
  { name: 'Dog', biome: 'Forest', rarity: 'Common', income: 2, incomeLabel: '$2/s', evidence: 'Cross-checked' },
  { name: 'Bird', biome: 'Forest', rarity: 'Uncommon', income: 8, incomeLabel: '$8/s', evidence: 'Cross-checked' },
  { name: 'Owl', biome: 'Forest', rarity: 'Rare', income: 35, incomeLabel: '$35/s', evidence: 'Cross-checked' },
  { name: 'Raccoon', biome: 'Forest', rarity: 'Rare', income: 45, incomeLabel: '$45/s', evidence: 'Cross-checked' },
  { name: 'Fox', biome: 'Forest', rarity: 'Epic', income: 180, incomeLabel: '$180/s', evidence: 'Cross-checked' },
  { name: 'Brr Brr Patapim', biome: 'Forest', rarity: 'Legendary', income: 1800, incomeLabel: '$1.8K/s', evidence: 'Community tracked' },
  { name: 'Frog', biome: 'Lake', rarity: 'Common', income: 3, incomeLabel: '$3/s', evidence: 'Cross-checked' },
  { name: 'Catfish', biome: 'Lake', rarity: 'Uncommon', income: 12, incomeLabel: '$12/s', evidence: 'Cross-checked' },
  { name: 'Turtle', biome: 'Lake', rarity: 'Rare', income: 60, incomeLabel: '$60/s', evidence: 'Cross-checked' },
  { name: 'Trulimero Trulicina', biome: 'Lake', rarity: 'Epic', income: 260, incomeLabel: '$260/s', evidence: 'Community tracked' },
  { name: 'Ice Dragon', biome: 'Snow', rarity: 'Eternal', income: 65000000, incomeLabel: '$65M/s', evidence: 'Community tracked' },
  { name: 'Lava Dragon', biome: 'Volcano', rarity: 'Eternal', income: 100000000, incomeLabel: '$100M/s', evidence: 'Community tracked' },
  { name: 'Unicorn', biome: 'Cosmic', rarity: 'Divine', income: 1000000000, incomeLabel: '$1B/s', evidence: 'Community tracked' },
  { name: 'Oni Tiger', biome: 'Cherry Blossom', rarity: 'Eternal', income: 600000000, incomeLabel: '$600M/s', evidence: 'Community tracked' },
  { name: 'Kitsune', biome: 'Cherry Blossom', rarity: 'Divine', income: 1800000000, incomeLabel: '$1.8B/s', evidence: 'Community tracked' }
];
