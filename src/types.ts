export type Category = 'Home' | 'Learning' | 'Prayers';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: Category;
  createdAt: Date;
}

export interface CategoryConfig {
  icon: string;
  color: string;
  description: string;
} 