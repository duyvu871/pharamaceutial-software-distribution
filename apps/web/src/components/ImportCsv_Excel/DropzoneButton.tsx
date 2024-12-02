'use client';

import { useRef, useState } from 'react';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import { Button, Group, Text } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import classes from './DropzoneButton.module.css';

export function DropzoneButton() {
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<File[]>([]); // State để lưu file đã chọn

  const handleDrop = (droppedFiles: File[]) => {
    setFiles(droppedFiles); // Cập nhật state
  };

  return (
    <div className={classes.wrapper}>
      {/* Form để gửi file */}
      <form
        action="/csv_portgra"
        method="post"
        encType="multipart/form-data"
        onSubmit={(e) => {
          if (files.length === 0) {
            e.preventDefault(); // Chặn submit nếu chưa có file
            alert('Vui lòng chọn ít nhất một file!');
          }
        }}
      >
        {/* Dropzone */}
        <Dropzone
          openRef={openRef}
          onDrop={handleDrop}
          className={classes.dropzone}
          radius="md"
          maxSize={30 * 1024 ** 2} // Tối đa 30MB
        >
          <div style={{ pointerEvents: 'none' }}>
            <Group justify="center">
              <Dropzone.Accept>
                <IconDownload size={50} color="blue" stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={50} color="red" stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload size={50} stroke={1.5} />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>Tải file ở đây</Dropzone.Accept>
              <Dropzone.Idle>Upload File</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Tải file CSV
            </Text>
          </div>
        </Dropzone>

        {/* Ẩn input file để form tự động nhận file từ Dropzone */}
        <input
          type="file"
          name="file"
          accept=".csv"
          hidden
          multiple={false}
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className={classes.control}
          size="md"
          radius="xl"
        >
          Upload File
        </Button>
      </form>
    </div>
  );
}
