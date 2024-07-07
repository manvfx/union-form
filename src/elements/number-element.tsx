import React from 'react';

interface NumberElementProps {
    value: number;
    onChange: (value: number) => void;
}

const NumberElement: React.FC<NumberElementProps> = ({ value, onChange }) => {
    return (
        <input
            type="number"
            className="input-class"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
        />
    );
};

export default NumberElement;
