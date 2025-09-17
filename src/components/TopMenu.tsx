'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { MoreVert as MoreVertIcon, Home, Dashboard, Description, Work } from '@mui/icons-material';
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
  const [navMenuAnchor, setNavMenuAnchor] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { user } = useAuth();

  const handleNavMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setNavMenuAnchor(event.currentTarget);
  };

  const handleNavMenuClose = () => {
    setNavMenuAnchor(null);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    handleNavMenuClose();
  };

  const navigationItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { label: 'Generate CV', path: '/ats/load', icon: <Work /> },
    { label: 'Edit CV', path: '/cv/load', icon: <Description /> },
    { label: 'ATS format', path: '/ats', icon: <Work /> },
    { label: 'CV format', path: '/cv', icon: <Description /> },
  ];
  return (
    <>
      <Nav>
        <NavContainer>
          <NavContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Tooltip title="Navigation Menu">
                <IconButton
                  onClick={handleNavMenuClick}
                  sx={{
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={navMenuAnchor}
                open={Boolean(navMenuAnchor)}
                onClose={handleNavMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {navigationItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    sx={{ minWidth: '150px' }}
                  >
                    <span style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
              <TitleContainer>
                <Title>Emprego</Title>
              </TitleContainer>
            </div>
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