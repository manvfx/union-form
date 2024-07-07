import React from 'react';

interface CheckboxItem {
    value: string;
    title: string;
}

interface CheckboxesElementProps {
    value: string[];
    items: CheckboxItem[];
    onChange: (value: string[]) => void;
}

const CheckboxesElement: React.FC<CheckboxesElementProps> = ({ value, items, onChange }) => {
    const handleChange = (itemValue: string, checked: boolean) => {
        const newValue = checked
            ? [...value, itemValue]
            : value.filter(v => v !== itemValue);
        onChange(newValue);
    };

    return (
        <>
            {items.map(item => (
                <div key={item.value}>
                    <input
                        type="checkbox"
                        value={item.value}
                        checked={value.includes(item.value)}
                        onChange={(e) => handleChange(item.value, e.target.checked)}
                    />
                    <label>{item.title}</label>
                </div>
            ))}
        </>
    );
};

export default CheckboxesElement;
