export interface Plan {
  id: number;
  name: string;
  buildingType: 'Turku' | 'Ulm' | 'Ams' | 'Lucca' | 'Koben';
  floor: '平屋' | '2階建て' | '3階建て';
  orientation: '南' | '北' | '東' | '西';
  tsubo: number; // in tsubo
  imageUrl: string;
}

export interface FilterState {
  buildingType: string;
  floor: string;
  orientation: string;
  tsuboRange: string;
}

export interface TsuboRange {
    label: string;
    value: string;
}

export interface BuildingType {
  readonly name: 'Turku' | 'Ulm' | 'Ams' | 'Lucca' | 'Koben';
  readonly imageUrl: string;
}

// Fix: Add missing GeminiFilterOptions interface.
export interface GeminiFilterOptions {
  planTypes: readonly string[];
  floors: readonly string[];
  orientations: readonly string[];
  maxArea: number;
}