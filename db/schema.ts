export type Recipe = {
  paramsId: string;
  title: string;
  description: string;
  image?: string;
  icon?: string;
  ingredients?: string[];
  instructions?: string[];
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: string;
  styles?: {
    bgColor?: string;
    textColor?: string;
    textColorHover?: string;
  };
};
