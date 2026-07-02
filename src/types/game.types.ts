export interface Rating {
  id: number;
  title: string;
  percent: number;
}

export interface Genre {
  name: string;
  slug: string;
}

export interface Developer {
  id: number;
  name: string;
  image_background: string;
}

export interface Publisher {
  id: number;
  name?: string;
  image_background: string;
}

export interface GameScreenshot {
  id: number;
  image: string;
  width?: number;
  height?: number;
}

export interface Game {
  id: number;
  name?: string;
  released: string;
  background_image: string;
  ratings: Rating[];
  genres: Genre[];
  website: string;
  description_raw: string;
  developers: Developer[];
  publishers: Publisher[];
  updated: string;
}

export type user = {
  id: string;
  email: string;
}

export type FetchOpts = {
  page?: number;
  pageSize?: number;
  search?: string;
  genres?: string;
  ordering?: string;
}

export type CatalogSearchParams = {
  page?: string;
  query?: string;
};
