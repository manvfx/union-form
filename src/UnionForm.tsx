import React, { useState, useEffect } from 'react';
import { FormField, FormProps, ValidationCriteria, FormFieldIdentifier } from './FormTypes';
import TextElement from './elements/text-element';
import NumberElement from './elements/number-element';
import TextareaElement from './elements/textarea-element';
import CheckboxElement from './elements/checkbox-element';
import CheckboxesElement from './elements/checkboxes-element';
import RadioButtonElement from './elements/radio-button-element';
import SelectElement from './elements/select-element';
import FileElement from './elements/file-element';
import './index.css';

const UnionForm: React.FC<FormProps> = ({ target, fields, onUpdateValidations, onUpdateIsValid, locale = 'en', direction = 'ltr' }) => {
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
        const label = field.locale && field.locale[locale] ? field.locale[locale].message : field.label;

        switch (field.identifier) {
            case FormFieldIdentifier.TEXT:
                return <TextElement value={value} onChange={(val) => handleChange(field.key, val)} />;
            case FormFieldIdentifier.NUMBER:
                return <NumberElement value={Number(value)} onChange={(val) => handleChange(field.key, val)} />;
            case FormFieldIdentifier.TEXTAREA:
                return <TextareaElement value={value} rows={field.rows} onChange={(val) => handleChange(field.key, val)} />;
            case FormFieldIdentifier.CHECKBOX:
                return <CheckboxElement checked={!!value} onChange={(val) => handleChange(field.key, val)} />;
            case FormFieldIdentifier.CHECKBOXES:
                return <CheckboxesElement value={value as string[]} items={field.items || []} onChange={(val) => handleChange(field.key, val)} />;
            case FormFieldIdentifier.RADIO:
                return <RadioButtonElement value={value} items={field.items || []} onChange={(val) => handleChange(field.key, val)} />;
            case FormFieldIdentifier.SELECT:
                return (
                    <SelectElement
                        value={value}
                        items={field.items || []}
                        onChange={(val) => handleChange(field.key, val)}
                        multiple={field.multiple}
                        tagInput={field.tagInput}
                    />
                );
            case FormFieldIdentifier.FILE:
                return <FileElement value={value} url={field.url!} onChange={(val) => handleChange(field.key, val)} />;
            default:
                return null;
        }
    };

    return (
        <form className={`dynamic-form ${direction}`}>
            {fields.map(field => {
                const showField = field.vIf ? Object.keys(field.vIf).every(key => validateCriteria(key as keyof ValidationCriteria, field.vIf![key], formState[key])) : true;
                if (!showField) return null;

                const label = field.locale && field.locale[locale] ? field.locale[locale].message : field.label;

                return (
                    <div key={field.key} className={`w-full md:w-${field.width || 12}/12`}>
                        <label>{label}</label>
                        {renderField(field)}
                        {validations[field.key] && <div className="error-class">{validations[field.key]}</div>}
                    </div>
                );
            })}
        </form>
    );
};

export default UnionForm;
