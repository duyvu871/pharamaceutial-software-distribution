import { Modal, Button } from '@mantine/core';
import { useState } from 'react';
import { UserForm } from './FormmodelUser';

export default function UserModal() {
    const [opened, setOpened] = useState(false);
  
    const open = () => setOpened(true);
    const close = () => setOpened(false);
  
    const handleSubmit = (values: unknown) => {
      console.log('Dữ liệu nhận được:', values);
      console.log("Dữ liệu sau khi tạo mới: ", values);
      fetch("/api/v1/admin/create-user", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Dữ liệu sau khi tạo mới: ", data);
          alert("Tạo mới thành công");
        })
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
  