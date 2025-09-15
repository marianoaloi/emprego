'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import AuthProvider from './auth/authProvider';
import { useAuth } from './auth/AuthContext';

export default function TopMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  return (
    <>
      <Nav>
        <NavContainer>
          <NavContent>
            <TitleContainer>
              <Title>Emprego</Title>
            </TitleContainer>
            {user &&
              <ButtonContainer>
                {/* <FilterButton onClick={() => router.push('/dashboard')}>
                  Dashboard
                </FilterButton> */}
                <FilterButton onClick={() => setIsModalOpen(true)}>
                  Search Filters
                </FilterButton>
              </ButtonContainer>
            }
            <AuthProvider />
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