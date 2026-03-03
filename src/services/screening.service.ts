import api from './api';
import type {
  GetScreeningsQuery,
  PaginatedScreenings,
  ScreeningConclusionResponse,
  ScreeningRequestResponse,
  UploadAnalyzeResponse,
  MedicalImageResponse,
  AiAnalysisResponse,
  CreateConclusionDto,
} from '@/types/screening';

const BASE_URL = '/screenings';

export const screeningService = {
  getAll: async (params?: GetScreeningsQuery): Promise<PaginatedScreenings> => {
    const response = await api.get<PaginatedScreenings>(BASE_URL, { params });
    return response.data;
  },

  getUploaded: async (params?: GetScreeningsQuery): Promise<PaginatedScreenings> => {
    const response = await api.get<PaginatedScreenings>(`${BASE_URL}/uploaded`, { params });
    return response.data;
  },

  getById: async (id: string): Promise<ScreeningRequestResponse> => {
    const response = await api.get<ScreeningRequestResponse>(`${BASE_URL}/${id}`);
    return response.data;
  },

  getImages: async (id: string): Promise<MedicalImageResponse[]> => {
    const response = await api.get<MedicalImageResponse[]>(`${BASE_URL}/${id}/images`);
    return response.data;
  },

  getAnalyses: async (id: string): Promise<AiAnalysisResponse[]> => {
    const response = await api.get<AiAnalysisResponse[]>(`${BASE_URL}/${id}/analyses`);
    return response.data;
  },

  getConclusions: async (id: string): Promise<ScreeningConclusionResponse[]> => {
    const response = await api.get<ScreeningConclusionResponse[]>(`${BASE_URL}/${id}/conclusions`);
    return response.data;
  },

  createConclusion: async (
    id: string,
    dto: CreateConclusionDto,
  ): Promise<ScreeningConclusionResponse> => {
    const response = await api.post<ScreeningConclusionResponse>(`${BASE_URL}/${id}/conclusions`, dto);
    return response.data;
  },

  uploadAndAnalyze: async (args: {
    patientId?: string;
    screeningId?: string;
    medicalRecordId?: string;
    image: File;
  }): Promise<UploadAnalyzeResponse> => {
    const formData = new FormData();
    formData.append('image', args.image);
    if (args.patientId) formData.append('patientId', args.patientId);
    if (args.screeningId) formData.append('screeningId', args.screeningId);
    if (args.medicalRecordId) formData.append('medicalRecordId', args.medicalRecordId);

    const response = await api.post<UploadAnalyzeResponse>(
      `${BASE_URL}/workflow/xray-analyze`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return response.data;
  },
};

export default screeningService;
