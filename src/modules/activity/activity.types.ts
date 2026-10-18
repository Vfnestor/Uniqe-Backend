export type ActivityItem = {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  href?: string;
  createdAt: string;
};

export type ActivityListResponse = {
  items: ActivityItem[];
  total: number;
  limit: number;
};