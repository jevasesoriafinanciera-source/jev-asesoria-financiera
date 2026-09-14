export type ScreenId =
  | 'inicio'
  | 'empresas'
  | 'emprendimientos'
  | 'persona-natural'
  | 'nosotros'
  | 'impacto'
  | 'contacto';

export interface DiagnosticFormData {
  profile: 'Empresa' | 'Emprendimiento' | 'Persona Natural';
  goal: string;
  name: string;
  contact: string;
}

export interface CorporateConsultationData {
  company: string;
  sector: string;
  revenueRange: string;
  challenge: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface StartupDiagnosticData {
  startupName: string;
  stage: string;
  businessModel: string;
  revenueMRR: string;
  primaryNeed: string;
  founderEmail: string;
  notes?: string;
}

export interface PersonalTaxData {
  taxpayerType: string;
  annualIncomeRange: string;
  hasForeignAssets: boolean;
  phone: string;
  email: string;
}

export interface StrategicSessionFormData {
  consultationReason: string;
  fullName: string;
  role: string;
  companyName?: string;
  email: string;
  phone: string;
  meetingMode: 'virtual' | 'presencial-bogota' | 'llamada';
  description: string;
  habeasDataAccepted: boolean;
}
