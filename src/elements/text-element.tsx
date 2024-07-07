import React from 'react';

interface TextElementProps {
    value: string;
    onChange: (value: string) => void;
}

const TextElement: React.FC<TextElementProps> = ({ value, onChange }) => {
    return (
        <input
            type="text"
            className="input-class"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default TextElement;
