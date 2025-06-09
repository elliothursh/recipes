export type Recipe = {
  paramsId: string;
  title: string;
  ingredients?: string[] | Record<string, string[]>;
  description: string;
  instructions?:
    | (string | Record<string, string | string[]>)[]
    | Record<string, string | string[]>;
  image?: {
    src: string;
    className?: string;
  };
  icon?: {
    src: string;
    className?: string;
  };
  prepTime?: number;
  cookTime?: number;
  totalTime?: number;
  servings?: number;
  ovenTemp?: number;
  styles?: {
    bgColor?: string;
    textColor?: string;
    textColorHover?: string;
  };
};
