import { Plan, TsuboRange, BuildingType } from './types';

export const BUILDING_TYPES: readonly BuildingType[] = [
    { name: 'Turku', imageUrl: 'https://picsum.photos/seed/newplan1/400/300' },
    { name: 'Ulm', imageUrl: 'https://picsum.photos/seed/newplan2/400/300' },
    { name: 'Ams', imageUrl: 'https://picsum.photos/seed/newplan3/400/300' },
    { name: 'Lucca', imageUrl: 'https://picsum.photos/seed/newplan4/400/300' },
    { name: 'Koben', imageUrl: 'https://picsum.photos/seed/newplan5/400/300' },
] as const;

export const FLOORS = ['平屋', '2階建て', '3階建て'] as const;
export const ORIENTATIONS = ['南', '北', '東', '西'] as const;

export const TSUBO_RANGES: TsuboRange[] = [
    { label: '〜20坪', value: '0-20' },
    { label: '20〜25坪', value: '20-25' },
    { label: '25〜30坪', value: '25-30' },
    { label: '30〜35坪', value: '30-35' },
    { label: '35〜40坪', value: '35-40' },
    { label: '40〜45坪', value: '40-45' },
    { label: '45坪〜', value: '45-999' },
];

export const mockPlans: Plan[] = [
    { id: 1, name: '光溢れるスカンジナビアの家', buildingType: 'Turku', floor: '2階建て', orientation: '南', tsubo: 32, imageUrl: 'https://picsum.photos/seed/newplan1/400/300' },
    { id: 2, name: '都市のミニマル邸宅', buildingType: 'Ulm', floor: '3階建て', orientation: '東', tsubo: 46, imageUrl: 'https://picsum.photos/seed/newplan2/400/300' },
    { id: 3, name: '運河沿いのモダンハウス', buildingType: 'Ams', floor: '平屋', orientation: '西', tsubo: 28, imageUrl: 'https://picsum.photos/seed/newplan3/400/300' },
    { id: 4, name: 'トスカーナの丘陵ヴィラ', buildingType: 'Lucca', floor: '2階建て', orientation: '南', tsubo: 41, imageUrl: 'https://picsum.photos/seed/newplan4/400/300' },
    { id: 5, name: '北欧デザインのコンパクトホーム', buildingType: 'Koben', floor: '平屋', orientation: '北', tsubo: 19, imageUrl: 'https://picsum.photos/seed/newplan5/400/300' },
    { id: 6, name: '中庭のあるTurkuスタイル', buildingType: 'Turku', floor: '平屋', orientation: '東', tsubo: 24, imageUrl: 'https://picsum.photos/seed/newplan6/400/300' },
    { id: 7, name: '静かな路地のUlmハウス', buildingType: 'Ulm', floor: '2階建て', orientation: '西', tsubo: 35, imageUrl: 'https://picsum.photos/seed/newplan7/400/300' },
    { id: 8, name: '機能美を追求したAms', buildingType: 'Ams', floor: '3階建て', orientation: '南', tsubo: 48, imageUrl: 'https://picsum.photos/seed/newplan8/400/300' },
    { id: 9, name: '家族が集うLuccaの家', buildingType: 'Lucca', floor: '2階建て', orientation: '北', tsubo: 38, imageUrl: 'https://picsum.photos/seed/newplan9/400/300' },
    { id: 10, name: '森に佇むKobenの隠れ家', buildingType: 'Koben', floor: '平屋', orientation: '西', tsubo: 22, imageUrl: 'https://picsum.photos/seed/newplan10/400/300' },
    { id: 11, name: '広々としたTurkuの平屋', buildingType: 'Turku', floor: '平屋', orientation: '南', tsubo: 29, imageUrl: 'https://picsum.photos/seed/newplan11/400/300' },
    { id: 12, name: '都会的なUlmの3階建て', buildingType: 'Ulm', floor: '3階建て', orientation: '北', tsubo: 42, imageUrl: 'https://picsum.photos/seed/newplan12/400/300' },
];