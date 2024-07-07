export enum FormFieldIdentifier {
  TEXT = 'text',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  CHECKBOXES = 'checkboxes',
  RADIO = 'radio',
  SELECT = 'select'
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
}

export interface FormProps {
  target: { [key: string]: any };
  fields: FormField[];
  onUpdateValidations: (validations: { [key: string]: any }) => void;
  onUpdateIsValid: (isValid: boolean) => void;
}
