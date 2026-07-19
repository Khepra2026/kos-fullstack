export type WebinarStatus = 'upcoming' | 'replay';

export interface WebinarEn {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  speaker: string;
  status: WebinarStatus;
  image: string;
  category: string;
}

export const webinarsEn: WebinarEn[] = [];



