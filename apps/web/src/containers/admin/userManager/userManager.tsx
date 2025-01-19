import React, { useEffect, useState } from 'react';
import { Table, TextInput, Button, Group, Pagination, Box, ScrollArea, Text, Switch, Flex } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import EditModal from './EditModal';
import { Prisma } from '@prisma/client'; // Import Prisma types
import UserModal from './ModalCreatUser';

// Define a type alias for the user model
type User = Prisma.usersGetPayload<{}>;

const UserManager = () => {
  const [elements, setElements] = useState<User[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [opened, setOpened] = useState(false);
  const [currentElement, setCurrentElement] = useState<User | null>(null);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/admin/get-users");
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data) {
          setElements(data as User[]);
        } else {
          console.error("Data is null or undefined");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = elements ? Math.ceil(elements.length / rowsPerPage) : 0;
  const currentData = elements ? elements.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage) : [];

  const rows = currentData.map((element) => {
    if(element) {
      return (
        <Table.Tr key={element.id}>
          <Table.Td>{element.username}</Table.Td>
          <Table.Td>{element.email}</Table.Td>
          <Table.Td>{element.phone_number}</Table.Td>
          <Table.Td>{element.address}</Table.Td>
          <Table.Td>
            <Switch
              size="md"
              checked={element.is_active}
              onLabel="ON"
              offLabel="OFF"
            />
          </Table.Td>
          <Table.Td>
            <Button
              variant="subtle"
              size="xs"
              onClick={() => openEditModal(element)}
            >
              <IconDotsVertical />
            </Button>
          </Table.Td>
        </Table.Tr>
      )
    }
    else {
      return null;
    }
  });

  const openEditModal = (element: User) => {
    setCurrentElement(element);
    setOpened(true);
  };

  const closeEditModal = () => {
    setOpened(false);
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" p="lg">
        <Text fw={700} fz="xl" c="black">
          Danh Sách Người Dùng
        </Text>
        <UserModal />
      </Flex>

      <Group mb="lg" p="lg" align="center" bg="#fff">
        {["Tài Khoản", "Email", "Số Điện Thoại", "Địa chỉ"].map((placeholder) => (
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

      <ScrollArea>
        <Table c="black">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Tên tài khoản</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Số điện thoại</Table.Th>
              <Table.Th>Địa Chỉ</Table.Th>
              <Table.Th>Trạng thái</Table.Th>
              <Table.Th>Tùy Chọn</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      <Group mt="lg">
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </Group>

      {currentElement && (
        <EditModal
          opened={opened}
          onClose={closeEditModal}
          currentElement={currentElement}
        />
      )}
    </Box>
  );
};

export default UserManager;