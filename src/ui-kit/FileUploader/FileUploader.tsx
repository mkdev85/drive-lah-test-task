import React from 'react';

import './FileUploader.scss';

interface FileUploaderProps {
  id: string;
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  id,
  label,
  name,
  onChange,
  disabled = false,
  error,
  helperText,
  accept = '*',
  multiple = false,
  required = false,
}) => {
  return (
    <div className="custom-file-upload-input-field">
      <label htmlFor={id} className={`input-label ${disabled ? 'disabled' : ''}`}>
        {label} {required && <span className="required">*</span>}
      </label>
      <label className="file-upload-label">
        <span className="text">Click to upload</span>
        <input
          id={id}
          type="file"
          name={name}
          onChange={onChange}
          disabled={disabled}
          accept={accept}
          multiple={multiple}
          className={`file-upload-input ${error ? 'error' : ''}`}
          required={required}
        />
      </label>
      {error && <span className="error-text">{error}</span>}
      {helperText && !error && <span className="helper-text">{helperText}</span>}
    </div>
  );
};

export default FileUploader;
