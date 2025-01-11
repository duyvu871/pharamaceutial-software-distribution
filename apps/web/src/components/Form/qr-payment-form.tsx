import { Button, Stack, NumberInput, Checkbox, Group, Text, TextInput, Box } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Typography } from '@component/Typography';
import { z } from 'zod';
import { Label } from '@component/label';
import { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { FileWithPath } from '@mantine/dropzone';
import { Image } from '@mantine/core';
import UploadButton from '../../Button/upload-button.tsx';
import { uploadStoreQRCode } from '@api/upload.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import useToast from '@hook/client/use-toast-notification.ts';
import { qrCodeAtom } from '@store/state/overview/branch.ts';
import { useAtom } from 'jotai';
import { ImageMantineWithFallback, ImageWithFallback } from '@component/Image/image-with-fallback.tsx';

export default function QRSupportForm() {
	const {branchId} = useDashboard();
	const {showErrorToast, showSuccessToast} = useToast();
	const [qrAsset, ] = useAtom(qrCodeAtom);

	const [loading, setLoading] = useState<boolean>(false)
	const [file, setFile] = useState<File | null>(null)
	const [imageURL, setImageURL] = useState<string | null>(null);

	const handleSaveQRSupport: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		if (!file) {
			return;
		}
		setLoading(true)
		uploadStoreQRCode(file, branchId).then(response  => {
			if (response && 'id' in response) {
				showSuccessToast("Lưu thành công QR hỗ trợ")
			} else if (response && 'errorCode' in response) {
				showErrorToast(response.errorDescription)
			}
			setTimeout(() => {
				setLoading(false)
			}, 1000)
		})
	}

	useEffect(() => {
		if (qrAsset) {
			setFile(null);
			setImageURL(qrAsset.asset.url);
		}
	}, [qrAsset]);

	useEffect(() => {
		if (file) {
			const imageUrl = URL.createObjectURL(file)
			setImageURL(imageUrl)
		}
	}, [file]);

	return (
		<Stack>
			<Typography
				size="h3"
				weight="semibold"
				className="border-b-[3px] border-teal-500 w-fit"
			>
				QR liên hệ (zalo)
			</Typography>

			<div className="p-5 pt-3">
				<Stack gap="md" maw={500}>
					<Box>
						<div
							className={'w-[300px] h-[300px] flex justify-center items-center aspect-square relative group rounded-md overflow-hidden border border-gray-200'}>
							{imageURL && (
								<Image
									src={imageURL}
									onLoad={() => (file && imageURL) && URL.revokeObjectURL(imageURL)}
									height={300}
									width={300}
									style={{objectFit: 'cover'}}
									className="rounded"
									alt="QR hỗ trợ"
								/>
							)}
						</div>
					</Box>

					<Group grow>
						<Button
							color="teal"
							mt="sm"
							maw={200}
							onClick={handleSaveQRSupport}
							disabled={loading}
						>
							{
								loading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Đang lưu...
									</>
								) : 'Lưu'
							}
						</Button>
						<UploadButton
							color="teal"
							mt="sm"
							maw={200}
							accept={'image/*'}
							onFileSelect={(file) => file && setFile(file)}
							disabled={loading}
						>
							<Box
								className={"flex items-center justify-center gap-2"}
							>
								<Upload className="w-4 h-4" />	Tải lên
							</Box>
						</UploadButton>
					</Group>
				</Stack>
			</div>
		</Stack>
	);
}

