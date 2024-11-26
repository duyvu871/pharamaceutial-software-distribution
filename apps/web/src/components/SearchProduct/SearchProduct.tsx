'use client'
import { useState } from 'react';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { ActionIcon, TextInput, useMantineTheme } from '@mantine/core';
const debounce = require('lodash.debounce');

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');
  const theme = useMantineTheme();

  const handleSearch = debounce((query: string) => {
    onSearch(query);
  }, 500); // Đặt debounce 500ms

  return (
    
    <TextInput
      radius="xl"
      size="xl"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        handleSearch(e.target.value); // Gửi query khi người dùng nhập
      }}
      placeholder="Search products"
      rightSectionWidth={42}
      leftSection={<IconSearch size={18} stroke={1.5} />}
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
        >
          <IconArrowRight size={30} stroke={1.5} />
        </ActionIcon>
      }
    />
  );
}
