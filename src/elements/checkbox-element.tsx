import React from 'react';

interface CheckboxElementProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const CheckboxElement: React.FC<CheckboxElementProps> = ({ checked, onChange }) => {
    return (
        <input
            type="checkbox"
            className="checkbox-class"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
        />
    );
};

export default CheckboxElement;
