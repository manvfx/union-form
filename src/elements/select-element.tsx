import React from 'react';

interface SelectItem {
    value: string;
    title: string;
}

interface SelectElementProps {
    value: string | string[];
    items: SelectItem[];
    onChange: (value: string | string[]) => void;
    multiple?: boolean;
    tagInput?: boolean;
}

const SelectElement: React.FC<SelectElementProps> = ({ value, items, onChange, multiple, tagInput }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { options } = event.target;
        if (multiple) {
            const selectedValues = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);
            onChange(selectedValues);
        } else {
            onChange(event.target.value);
        }
    };

    const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const tags = event.target.value.split(',').map(tag => tag.trim());
        onChange(tags);
    };

    if (tagInput) {
        return (
            <input
                type="text"
                value={Array.isArray(value) ? value.join(', ') : value}
                onChange={handleTagInputChange}
                placeholder="Enter tags separated by commas"
            />
        );
    }

    return (
        <select value={Array.isArray(value) ? value : [value]} multiple={multiple} onChange={handleChange}>
            {items.map(item => (
                <option key={item.value} value={item.value}>
                    {item.title}
                </option>
            ))}
        </select>
    );
};

export default SelectElement;
