export type Category = 'Home' | 'Learning' | 'Prayers';

export type PrayerTime = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: Category;
  createdAt: Date;
  dueDate?: Date; // For monthly tasks
  prayerTime?: PrayerTime; // For prayer tasks
}

export interface CategoryConfig {
  icon: string;
  color: string;
  description: string;
  subCategories?: {
    [key: string]: {
      icon: string;
      description: string;
    };
  };
} 