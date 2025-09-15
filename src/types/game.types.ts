export interface Rating {
  id: number;
  title: string;
  percent: number;
}

export interface Genre {
  name: string;
}

export interface Game {
  id: number;
  name?: string;
  released: string;
  background_image: string;
  ratings: Rating[];
  genres: Genre[];
}
