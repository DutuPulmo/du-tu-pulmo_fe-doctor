import api from './api';
import type { CreateReportDto, ReportItem } from '@/types/report';

export const reportService = {
  create: async (dto: CreateReportDto): Promise<ReportItem> => {
    const response = await api.post<ReportItem>('/reports', dto);
    return response.data;
  },

  getMyReports: async (): Promise<ReportItem[]> => {
    const response = await api.get<ReportItem[]>('/reports/my-reports');
    return response.data;
  },
};

export default reportService;
