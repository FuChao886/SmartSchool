
export interface Task {
  id: string;
  title: string;
  category: 'Study' | 'Activity' | 'Life' | 'Exam';
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  author: string;
  type: 'Note' | 'Exam' | 'Book' | 'Slide';
  rating: number;
  downloads: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  LEARNING = 'learning',
  SCHEDULE = 'schedule',
  HEALTH = 'health',
  RESOURCES = 'resources'
}
