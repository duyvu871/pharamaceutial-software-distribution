import { Button, ButtonProps } from '@mantine/core';
import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react';

interface UploadButtonProps extends ButtonProps {
	onFileSelect?: (file: File | null) => void;
	accept?: string;
	multiple?: boolean;
}

interface UploadButtonRef {
	openFileDialog: () => void;
}

const UploadButton = forwardRef<UploadButtonRef, UploadButtonProps>(
	({ children, onFileSelect, accept, multiple = false, ...props }, ref) => {
		const fileInputRef = useRef<HTMLInputElement>(null);
		const [selectedFile, setSelectedFile] = useState<File | null>(null);

		const handleButtonClick = () => {
			fileInputRef.current?.click();
		};

		const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const files = event.target.files;

			if (files && files.length > 0) {
				const file = multiple ? Array.from(files) : files[0];
				if(multiple){
					onFileSelect?.(file as unknown as File) // For multiple
				} else {
					setSelectedFile(file as File);
					onFileSelect?.(file as File);
				}
			} else {
				setSelectedFile(null);
				onFileSelect?.(null)
			}
		};

		useImperativeHandle(ref, () => ({
			openFileDialog: handleButtonClick,
		}));

		return (
			<>
				<input
					type="file"
					ref={fileInputRef}
					style={{ display: 'none' }}
					onChange={handleFileChange}
					accept={accept}
					multiple={multiple}
				/>
				<Button onClick={handleButtonClick} {...props}>
					{children}
				</Button>
			</>
		);
	}
);

UploadButton.displayName = 'UploadButton';

export default UploadButton;