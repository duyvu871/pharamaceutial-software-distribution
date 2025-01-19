import React, { useEffect, useState } from 'react';
import { Table, TextInput, Button, Group, Pagination, Box, ScrollArea, Text, Flex } from '@mantine/core';
// import { getAdminData } from '@/app/api/v1/PageAdmin';
// import {  StatItems } from '@/app/schema/stat';
import AdminModal from './ModalCreat';
import { IconDotsVertical } from '@tabler/icons-react';
import EditAdmin from './EditAdmin';
import { StatItems } from '@schema/test/stat.ts';
import { getAdminData } from '@api/admin/get-admin.ts';
const AdminManager = () => {
      const [elements, setElements] = useState<StatItems[] | undefined>(undefined);
      const [currentPage, setCurrentPage] = useState(1);
      const [opened, setOpened] = useState(false); // Trạng thái mở Modal
      const [currentElement, setCurrentElement] = useState<StatItems | null>(null); // Lưu dòng dữ liệu hiện tại
      const rowsPerPage = 5;
      const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsMounted(true);

      console.log("Fetching data...");
      try {
        const data = await getAdminData({ type: 'main' }, true);
        if (data?.Admin) {
          // Ép kiểu dữ liệu nếu bạn chắc chắn đây là StatItems[]
          setElements(data.Admin as StatItems[]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  

  // Tính toán số trang
  const totalPages = elements ? Math.ceil(elements.length / rowsPerPage) : 0;
  
  // Lấy dữ liệu hiển thị theo từng trang
  const currentData = elements ? elements.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage) : [];
  
  // Render các dòng cho bảng
  const rows = currentData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.username}</Table.Td>
      <Table.Td>{element.fullName}</Table.Td>
      <Table.Td>{element.phoneNumber}</Table.Td>
      <Table.Td>{element.address}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.gender}</Table.Td>
      <Table.Td>{element.birthDate}</Table.Td>
      <Table.Td>
            <Button
              variant="subtle"
              size="xs"
              onClick={() => openEditModal(element)} // Mở modal khi click vào dấu 3 chấm
            >
              <IconDotsVertical />
            </Button>
          </Table.Td>
    </Table.Tr>
  ));
  const openEditModal = (element: StatItems) => {
        setCurrentElement(element);
        setOpened(true); // Mở modal khi chọn dòng dữ liệu
      };
    
      const closeEditModal = () => {
        setOpened(false); // Đóng modal  
      };
  return (
    <Box>
     <Flex justify="space-between" align="center" p="lg">
        <Text fw={700} fz="xl" c="black">
          Danh Sách Admin
        </Text>

        <AdminModal />
      </Flex>
      {/* Tìm kiếm */}
      <Group mb="lg" p="lg" align="center" bg="#fff">
     {["Tài Khoản", "Họ và Tên", "Địa chỉ", "Email"].map((placeholder) => (
    <TextInput
      key={placeholder}
      placeholder={placeholder}
      styles={{
        input: {
          backgroundColor: '#fff',
          color: '#000',
        },
      }}
    />
  ))}
  <Button>Tìm kiếm</Button>
</Group>


      {/* Bảng */}
      <ScrollArea>
        <Table c="black">
          <Table.Thead>
            <Table.Tr >
              <Table.Th>ID</Table.Th>
              <Table.Th>Tài Khoản</Table.Th>
              <Table.Th>Họ và Tên</Table.Th>
              <Table.Th>Số Điện Thoại</Table.Th>
              <Table.Th>Địa chỉ</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Giới tính</Table.Th>
              <Table.Th>Ngày sinh</Table.Th>
              <Table.Th>Tùy chọn</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      {/* Phân trang */}
      <Group mt="lg">
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={(page) => setCurrentPage(page)} 
        />
      </Group>
      {currentElement && isMounted  && (
        <EditAdmin
          opened={opened}
          onClose={closeEditModal}
          currentElement={currentElement}
        />
      )}
    </Box>
  );
};

export default AdminManager;
