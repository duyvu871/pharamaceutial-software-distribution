import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

type UploadDropzoneProps = {
	acceptIcon?: React.ReactNode;
	rejectIcon?: React.ReactNode;
	idleIcon?: React.ReactNode;
	labelSection?: React.ReactNode;
}

export function UploadDropzone(props: Partial<DropzoneProps & UploadDropzoneProps>) {
	return (
		<Dropzone
			onDrop={(files) => props.onDrop && props.onDrop(files)}
			onReject={(files) => props.onReject && props.onReject(files)}
			maxSize={props.maxSize || 5 * 1024 ** 2}
			accept={props.accept || IMAGE_MIME_TYPE}
			{...props}
		>
			<Group justify="center" gap="xl" style={{ pointerEvents: 'none' }}>
				<Dropzone.Accept>
					{props.acceptIcon || (
						<IconUpload
							style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
							stroke={1.5}
						/>
					)}
				</Dropzone.Accept>
				<Dropzone.Reject>
					{props.rejectIcon || (
						<IconX
							style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
							stroke={1.5}
						/>
					)}
				</Dropzone.Reject>
				<Dropzone.Idle>
					{props.idleIcon || (
						<IconPhoto
							style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
							stroke={1.5}
						/>
					)}
				</Dropzone.Idle>
				{
					props.labelSection && (
						<div>
							{props.labelSection}
						</div>
					)
				}
			</Group>
		</Dropzone>
	);
}