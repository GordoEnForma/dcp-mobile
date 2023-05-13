export interface DiagnosisData {
  id: string;
  state: 'Pendiente' | 'Completado';
  created_at: Date;
  photo_url: string;
  diagnosis?: {
    result: string;
    probability: number;
    severity: string;
  };
}
