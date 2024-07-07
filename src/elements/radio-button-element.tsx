import React from 'react';

interface RadioItem {
    value: string;
    title: string;
}

interface RadioButtonElementProps {
    value: string;
    items: RadioItem[];
    onChange: (value: string) => void;
}

const RadioButtonElement: React.FC<RadioButtonElementProps> = ({ value, items, onChange }) => {
    return (
        <>
            {items.map(item => (
                <div key={item.value}>
                    <input
                        type="radio"
                        name="radioGroup"
                        value={item.value}
                        checked={value === item.value}
                        onChange={() => onChange(item.value)}
                    />
                    <label>{item.title}</label>
                </div>
            ))}
        </>
    );
};

export default RadioButtonElement;
