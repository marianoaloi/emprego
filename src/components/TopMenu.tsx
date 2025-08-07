'use client';

import { useState } from 'react';
import JobSearchModal from './JobSearchModal';
import {
  Nav,
  NavContainer,
  NavContent,
  TitleContainer,
  Title,
  ButtonContainer,
  FilterButton
} from './TopMenu.styled';

export default function TopMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Nav>
        <NavContainer>
          <NavContent>
            <TitleContainer>
              <Title>Emprego</Title>
            </TitleContainer>
            <ButtonContainer>
              <FilterButton onClick={() => setIsModalOpen(true)}>
                Search Filters
              </FilterButton>
            </ButtonContainer>
          </NavContent>
        </NavContainer>
      </Nav>
      
      <JobSearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}