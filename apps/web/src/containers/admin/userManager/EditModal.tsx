import React, { useEffect } from 'react';
import { Modal, TextInput, Switch, Button, Group, Box } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { Stores } from '@schema/test/stat';
// import { Stores } from '@/app/schema/stat';

interface EditModalProps {
    opened: boolean;
    onClose: () => void;
    currentElement: Stores | undefined;
  }
  
  const EditModal: React.FC<EditModalProps> = ({ opened, onClose, currentElement }) => {
    const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (currentElement) {
      setValue('Id_manager', currentElement.managerId);
      setValue('consumer_name', currentElement.name);
      setValue('phone_number', currentElement.phone);
      setValue('active', currentElement.active);
      setValue('address', currentElement.address);
      setValue('firstName', currentElement.firstName);
      setValue('firstName', currentElement.firstName);
      setValue('level', currentElement.level);
      console.log(setValue)
    }
  }, [currentElement, setValue]);

  const onSubmit = (data:unknown) => {
    console.log("Dữ liệu sau khi cập nhật: ", data);
    
  };

  return (
  <Modal opened={opened} onClose={onClose} size="55rem" withCloseButton={false}>
        <Modal.Header>
              <Modal.Title >Danh Sách Store - Chỉnh Sửa</Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>      
      <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
          name="Id_manager"
          control={control}
          render={({ field }) => (
            <TextInput label="Mã cửa hàng " placeholder="Nhập Mã cửa hàng " {...field} />
          )}
        />
        <Controller
          name="consumer_name"
          control={control}
          render={({ field }) => (
            <TextInput label="Tên cửa hàng " placeholder="Nhập tên cửa hàng " {...field} />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextInput label="Địa chỉ" placeholder="Nhập Địa chỉ" {...field} />
          )}
        />
         <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextInput label="Tên chủ cửa hàng" placeholder="Nhập Tên chủ cửa hàng" {...field} />
          )}
        /> <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextInput label="Tên chủ đại lý" placeholder="Nhập Tên chủ đại lý" {...field} />
        )}
      />
        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <TextInput label="Số điện thoại" placeholder="Nhập số điện thoại" {...field} />
          )}
        />
        <Box h="20px"></Box>
        <Controller 
          name="active"
          control={control}
          render={({ field }) => (
            <Switch label="Trạng thái" {...field} />
          )}
        />
        <Box h="20px"></Box>

        <Group >
          <Button type="submit">Lưu</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default EditModal;
