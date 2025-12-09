'use client';

import { useState } from 'react';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import { Bolt as BoltIcon } from '@mui/icons-material';
import { useAppDispatch } from '@/lib/hooks';
import { setFilter } from '@/lib/features/filter/filterSlice';
import { DEFAULT_JOB_FILTER } from '@/types/job.filter.types';
import { PRESET_FILTERS, PresetFilter } from '@/constants/prefilters';
import { PreFilterButton } from './PreFilterMenu.styled';


  interface PresetFilterProps {
    setTitleFilter: (title: string) => void;
  }

export default function PreFilterMenu({setTitleFilter} : PresetFilterProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  const handlePresetSelect = (preset: PresetFilter) => {
    setTitleFilter(preset.label)
    const mergedFilter = { ...DEFAULT_JOB_FILTER, ...preset.filter };
    dispatch(setFilter(mergedFilter));
    handleClose();
  };

  return (
    <>
      <Tooltip title="Quick Filter Presets">
        <PreFilterButton
          onClick={handleClick}
          aria-controls={isOpen ? 'preset-filters-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
        >
          <BoltIcon sx={{ fontSize: '1.2rem' }} />
        </PreFilterButton>
      </Tooltip>
      <Menu
        id="preset-filters-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {PRESET_FILTERS.map((preset) => (
          <MenuItem
            key={preset.id}
            onClick={() => handlePresetSelect(preset)}
            sx={{ minWidth: '180px' }}
          >
            {preset.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

