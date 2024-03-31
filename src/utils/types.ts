export interface Anomaly {
  platform: string;
  startId: string;
  startDate: Date;
  endId: string;
  endDate: Date;
  createdAt: Date;
  tweets: number;
  shiftTimeAverage: number;
  period: number;
}

export interface Tweet {
  platform: string;
  platformId: string;
  content: string;
  createdAt: Date;
  hashtags: string[];
  archived: boolean;
}
