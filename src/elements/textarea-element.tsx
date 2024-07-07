import React from 'react';

interface TextareaElementProps {
    value: string;
    rows?: number;
    onChange: (value: string) => void;
}

const TextareaElement: React.FC<TextareaElementProps> = ({ value, rows = 3, onChange }) => {
    return (
        <textarea
            className="textarea-class"
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default TextareaElement;
