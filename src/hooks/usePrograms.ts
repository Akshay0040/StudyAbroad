import { useState, useMemo } from 'react';
import { programs } from '../data/programs';
import { Program } from '../types';

export const usePrograms = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = useMemo<Program[]>(() => {
    if (searchQuery.trim() === '') {
      return programs;
    }
    return programs.filter(program =>
      program.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredPrograms,
    totalCount: programs.length,
  };
};