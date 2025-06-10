export type Category = 'Home' | 'Learning' | 'Prayers';

export type PrayerTime = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

export type LearningType = 'Daily' | 'Monthly';

export interface SubCategoryConfig {
  icon: string;
  description: string;
  color: string;
}

export interface CategoryConfig {
  icon: string;
  color: string;
  description: string;
  subCategories: Record<string, SubCategoryConfig>;
}

export interface LearningTask {
  id: string;
  text: string;
  completed: boolean;
  category: Category;
  createdAt: Date;
  dueDate?: Date;
  type: LearningType;
  progress?: number;
  dailyTasks?: string[];
  completedDailyTasks?: string[];
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: Category;
  createdAt: Date;
  dueDate?: Date; // For monthly tasks
  prayerTime?: PrayerTime; // For prayer tasks
  type?: LearningType;
  progress?: number;
  dailyTasks?: string[];
  completedDailyTasks?: string[];
} 