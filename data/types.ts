export type StoreId = "ramen" | "football" | "music" | "museum" | "manga";
export type Category = "Projects" | "Achievements" | "Skills" | "Experience" | "Experiments";
export type Vector3Tuple = [number, number, number];

export interface PortfolioItem {
  id: string;
  title: string;
  category: Category;
  subtitle: string;
  description: string;
  technologies?: string[];
  highlights?: string[];
  github?: string;
  link?: string;
  label?: string;
  prototype?: boolean;
}

export interface Store {
  id: StoreId;
  name: string;
  sign: string;
  category: Category;
  number: string;
  floor: string;
  description: string;
  invitation: string;
  color: string;
  position: Vector3Tuple;
  scale: Vector3Tuple;
  items: PortfolioItem[];
}