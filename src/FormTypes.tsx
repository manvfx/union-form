// src/FormTypes.ts
export enum FormFieldIdentifier {
  TEXT = 'text',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  CHECKBOXES = 'checkboxes',
  RADIO = 'radio',
  SELECT = 'select',
  FILE = 'file'
}

export interface ValidationCriteria {
  [key: string]: any;
  $ne?: any;
  $eq?: any;
  $gte?: number;
  $lte?: number;
}

export interface ValidationRule {
  criteria?: ValidationCriteria;
  message?: string;
  validate?: (value: any) => boolean | string;
}

export interface LocaleMessages {
  [key: string]: { message: string };
}

export interface FormField {
  key: string;
  identifier: FormFieldIdentifier;
  label: string;
  preemptWidth?: number;
  width?: number;
  rows?: number;
  items?: { value: string; title: string }[];
  rules?: ValidationRule[];
  vIf?: ValidationCriteria;
  multiple?: boolean;
  tagInput?: boolean;
  locale?: LocaleMessages;
  url?: string;
}

export interface FormProps {
  target: { [key: string]: any };
  fields: FormField[];
  onUpdateValidations: (validations: { [key: string]: any }) => void;
  onUpdateIsValid: (isValid: boolean) => void;
  locale?: string;
  direction?: 'ltr' | 'rtl';
}
