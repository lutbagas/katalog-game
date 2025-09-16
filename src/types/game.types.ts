export interface Rating {
  id: number;
  title: string;
  percent: number;
}

export interface Genre {
  name: string;
}

export interface Developer {
  id: number;
  name: string;
  image_background: string;
}

export interface Publisher {
  id: number;
  name: string;
  image_background: string;
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
}
