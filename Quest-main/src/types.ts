export interface FormDataInterface {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

export const FORM_FIELD_IDS = [
  'f-name',
  'f-phone',
  'f-subject',
  'f-message',
] as const;

export type FormFieldId = (typeof FORM_FIELD_IDS)[number];
export type FormFieldKey = keyof FormDataInterface;

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<FormFieldKey, string>>;
}

export type ToastType = 'success' | 'error' | 'info';
