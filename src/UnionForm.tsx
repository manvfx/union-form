import React, { useState, useEffect } from 'react';
import { FormField, FormProps, ValidationCriteria } from './FormTypes';
import TextElement from './elements/text-element';
import NumberElement from './elements/number-element';
import TextareaElement from './elements/textarea-element';
import CheckboxElement from './elements/checkbox-element';
import CheckboxesElement from './elements/checkboxes-element';
import RadioButtonElement from './elements/radio-button-element';
import SelectElement from './elements/select-element';
import './index.css';

const UnionForm: React.FC<FormProps> = ({ target, fields, onUpdateValidations, onUpdateIsValid }) => {
    const [formState, setFormState] = useState(target);
    const [validations, setValidations] = useState<{ [key: string]: any }>({});
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        const newValidations: { [key: string]: any } = {};
        let formIsValid = true;

        fields.forEach(field => {
            const value = formState[field.key];
            field.rules?.forEach(rule => {
                if (rule.validate) {
                    const result = rule.validate(value);
                    if (result !== true) {
                        newValidations[field.key] = result;
                        formIsValid = false;
                    }
                } else if (rule.criteria) {
                    const criteriaKey = Object.keys(rule.criteria)[0] as keyof ValidationCriteria;
                    const criteriaValue = rule.criteria[criteriaKey];
                    const isValid = validateCriteria(criteriaKey, criteriaValue, value);
                    if (!isValid) {
                        newValidations[field.key] = rule.message;
                        formIsValid = false;
                    }
                }
            });
        });

        setValidations(newValidations);
        setIsValid(formIsValid);
        onUpdateValidations(newValidations);
        onUpdateIsValid(formIsValid);
    }, [formState]);

    const validateCriteria = (criteriaKey: keyof ValidationCriteria, criteriaValue: any, value: any): boolean => {
        switch (criteriaKey) {
            case '$ne':
                return value !== criteriaValue;
            case '$eq':
                return value === criteriaValue;
            case '$gte':
                return value >= criteriaValue;
            case '$lte':
                return value <= criteriaValue;
            // Add more criteria as needed
            default:
                return true;
        }
    };

    const handleChange = (key: string, value: any) => {
        setFormState({
            ...formState,
            [key]: value,
        });
    };

    const renderField = (field: FormField) => {
        const value = formState[field.key] || '';

        switch (field.identifier) {
            case 'text':
                return <TextElement value={value} onChange={(val) => handleChange(field.key, val)} />;
            case 'number':
                return <NumberElement value={Number(value)} onChange={(val) => handleChange(field.key, val)} />;
            case 'textarea':
                return <TextareaElement value={value} rows={field.rows} onChange={(val) => handleChange(field.key, val)} />;
            case 'checkbox':
                return <CheckboxElement checked={!!value} onChange={(val) => handleChange(field.key, val)} />;
            case 'checkboxes':
                return <CheckboxesElement value={value as string[]} items={field.items || []} onChange={(val) => handleChange(field.key, val)} />;
            case 'radio':
                return <RadioButtonElement value={value} items={field.items || []} onChange={(val) => handleChange(field.key, val)} />;
            case 'select':
                return <SelectElement value={value} items={field.items || []} onChange={(val) => handleChange(field.key, val)} />;
            default:
                return null;
        }
    };

    return (
        <form>
            {fields.map(field => {
                const showField = field.vIf ? Object.keys(field.vIf).every(key => validateCriteria(key as keyof ValidationCriteria, field.vIf![key], formState[key])) : true;
                if (!showField) return null;

                return (
                    <div key={field.key} className={`w-full md:w-${field.width || 12}/12`}>
                        <label>{field.label}</label>
                        {renderField(field)}
                        {validations[field.key] && <div className="error-class">{validations[field.key]}</div>}
                    </div>
                );
            })}
        </form>
    );
};

export default UnionForm;
