import React, { useState } from 'react';

interface FileElementProps {
    value: string;
    url: string;
    onChange: (value: string) => void;
}

const FileElement: React.FC<FileElementProps> = ({ value, url, onChange }) => {
    const [fileName, setFileName] = useState(value);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();
                setFileName(result.fileName);
                onChange(result.fileName);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {fileName && <p>Uploaded file: {fileName}</p>}
        </div>
    );
};

export default FileElement;
