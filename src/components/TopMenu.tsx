'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { MoreVert as MoreVertIcon, Home, Dashboard, Description, Work, RestartAlt } from '@mui/icons-material';
import JobSearchModal from './JobSearchModal';
import PreFilterMenu from './PreFilterMenu';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchData, fetchDataCount } from '@/lib/features/data/dataTruck';
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
  const [title,setTitle] = useState<string>('Emprego');
  const router = useRouter();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.filter);

  const handleNavMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setNavMenuAnchor(event.currentTarget);
  };




  const handleNavMenuClose = () => {
    setNavMenuAnchor(null);
  };

  const handleNavigation = (path: string, openSternal: boolean = true) => {
    if (openSternal) { window.open(path, '_blank'); }
    else { router.push(path); }
    handleNavMenuClose();
  };

  const handleRestart = () => {
    dispatch(fetchData(filters));
    dispatch(fetchDataCount(filters));
  };

  const cleanTitle = () => {
    setTitle('Emprego')
  }

  const setTitleFilter = (title:string) => {
    setTitle(`Emprego - ${title}`)
  }


  const navigationItems = [
    { label: 'Home', path: '/', openSternal: false, icon: <Home /> },
    { label: 'Dashboard', path: '/dashboard', openSternal: true, icon: <Dashboard /> },
    { label: 'Generate CV', path: '/ats/load', openSternal: true, icon: <Work /> },
    { label: 'Edit CV', path: '/cv/load', openSternal: true, icon: <Description /> },
    { label: 'ATS format', path: '/ats', openSternal: true, icon: <Work /> },
    { label: 'CV format', path: '/cv', openSternal: true, icon: <Description /> },
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
                    onClick={() => handleNavigation(item.path, item.openSternal)}
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
                <Title>{title}</Title>
              </TitleContainer>
            </div>
            {user &&
              <ButtonContainer>
                {/* <FilterButton onClick={() => router.push('/dashboard')}>
                  Dashboard
                </FilterButton> */}
                <PreFilterMenu setTitleFilter={setTitleFilter} />
                <FilterButton  onClick={() => setIsModalOpen(true)} >
                  Search Filters
                </FilterButton>
                <Tooltip title="Restart - Refresh data with current filters">
                  <FilterButton onClick={handleRestart}>
                    <RestartAlt sx={{ fontSize: '1.2rem' }} />
                  </FilterButton>
                </Tooltip>
              </ButtonContainer>
            }
            <AuthProvider />
          </NavContent>
        </NavContainer>
      </Nav>

      <JobSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cleanTitle={cleanTitle}
      />
    </>
  );
}