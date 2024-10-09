import { render, screen, fireEvent } from '@testing-library/react';

import FileUploader, { FileUploaderProps } from './FileUploader';

describe('FileUploader Component', () => {
  const defaultProps: FileUploaderProps = {
    id: 'test-file-uploader',
    label: 'Upload File',
    name: 'testFile',
    onChange: jest.fn(),
  };

  it('Should renders the file uploader input correctly', () => {
    render(<FileUploader {...defaultProps} />);
    const labelElement = screen.getByText('Upload File');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', 'test-file-uploader');

    const inputElement = screen.getByLabelText('Click to upload');
    expect(inputElement).toHaveAttribute('type', 'file');
  });

  it('Should calls onChange handler when a file is uploaded', () => {
    render(<FileUploader {...defaultProps} />);
    const inputElement = screen.getByLabelText('Click to upload');

    const file = new File(['dummy content'], 'example.image', { type: 'image/*' });
    fireEvent.change(inputElement, { target: { files: [file] } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('Should renders an error message when error prop is provided', () => {
    render(<FileUploader {...defaultProps} error="File is required" />);
    expect(screen.getByText('File is required')).toBeInTheDocument();
  });

  it('Should renders helper text when helperText prop is provided and no error', () => {
    render(<FileUploader {...defaultProps} helperText="Supported formats: jpg, png" />);
    expect(screen.getByText('Supported formats: jpg, png')).toBeInTheDocument();
  });
});
