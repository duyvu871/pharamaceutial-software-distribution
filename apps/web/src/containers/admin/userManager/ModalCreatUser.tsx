import { Modal, Button } from '@mantine/core';
import { useState } from 'react';
import { UserForm } from './FormmodelUser';

export default function UserModal() {
    const [opened, setOpened] = useState(false);
  
    const open = () => setOpened(true);
    const close = () => setOpened(false);
  
    const handleSubmit = (values: unknown) => {
      console.log('Dữ liệu nhận được:', values);
      // ô thêm creat db hay gì ở đây á 
    };
  
    return (
      <>
        <Modal.Root opened={opened} onClose={close} size="55rem">
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Danh sách cửa hàng - Tạo Mới</Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body>
              <UserForm onSubmit={handleSubmit} onClose={close} />
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
  
        <Button variant="default" onClick={open} bg="blue">
          Thêm Cửa Hàng 
        </Button>
      </>
    );
  }
  