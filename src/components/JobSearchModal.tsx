'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  IconButton,
  Typography,
  Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { JobSearchFilter, RemoteWorkType, SystemRecruiterType, LanguageCode, DEFAULT_JOB_FILTER } from '@/types/job.filter.types';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setFilter, resetFilters } from '@/lib/features/filter/filterSlice';
import italianProvinces from './ItalianProvinces.json';

interface JobSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JobSearchModal({ isOpen, onClose }: JobSearchModalProps) {
  const dispatch = useAppDispatch();
  const { filters: reduxFilters } = useAppSelector((state) => state.filter);
  const [localFilters, setLocalFilters] = useState<JobSearchFilter>(reduxFilters);

  // Convert Italian provinces to autocomplete options
  const provinceOptions = Object.entries(italianProvinces).map(([code, name]) => ({
    code,
    label: name,
    value: code
  }));

  // Update local state when Redux state changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(reduxFilters);
    }
  }, [isOpen, reduxFilters]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof JobSearchFilter, value: string | number | boolean) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update Redux state with local form values
    dispatch(setFilter(localFilters));
    onClose();
  };

  const handleReset = () => {
    setLocalFilters(DEFAULT_JOB_FILTER);
    dispatch(resetFilters());
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Job Search Filters</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)' }}
            gap={2}
          >
            <Box>
              <TextField
                fullWidth
                label="Job Title"
                value={localFilters.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter job title"
                margin="normal"
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Company Name"
                value={localFilters.companyName || ''}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter company name"
                margin="normal"
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Country"
                value={localFilters.country || ''}
                onChange={(e) => handleInputChange('country', e.target.value)}
                placeholder="Enter country"
                margin="normal"
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Location"
                value={localFilters.formattedLocation || ''}
                onChange={(e) => handleInputChange('formattedLocation', e.target.value)}
                placeholder="Enter location"
                margin="normal"
              />
            </Box>

            <Box>
              <FormControl fullWidth margin="normal">
                <InputLabel>Remote Work Type</InputLabel>
                <Select
                  value={localFilters.remote || ''}
                  label="Remote Work Type"
                  onChange={(e) => handleInputChange('remote', e.target.value as RemoteWorkType)}
                >
                  <MenuItem value="">Select remote type</MenuItem>
                  <MenuItem value="H">Hybrid</MenuItem>
                  <MenuItem value="R">Remote</MenuItem>
                  <MenuItem value="O">On-site</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <FormControl fullWidth margin="normal">
                <InputLabel>System Recruiter</InputLabel>
                <Select
                  value={localFilters.systemRecruter || ''}
                  label="System Recruiter"
                  onChange={(e) => handleInputChange('systemRecruter', e.target.value as SystemRecruiterType)}
                >
                  <MenuItem value="">Select recruiter type</MenuItem>
                  <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                  <MenuItem value="Empty">Empty</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <FormControl fullWidth margin="normal">
                <InputLabel>Language</InputLabel>
                <Select
                  value={localFilters.lang || ''}
                  label="Language"
                  onChange={(e) => handleInputChange('lang', e.target.value as LanguageCode)}
                >
                  <MenuItem value="">Select language</MenuItem>
                  <MenuItem value="pt">Portuguese</MenuItem>
                  <MenuItem value="it">Italian</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <TextField
                fullWidth
                type="number"
                label="Limit"
                value={localFilters.limit || ''}
                onChange={(e) => handleInputChange('limit', parseInt(e.target.value) || 0)}
                placeholder="Enter limit"
                margin="normal"
                inputProps={{ min: 1 }}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Start Date Filter"
                value={localFilters.datai || ''}
                onChange={(e) => handleInputChange('datai', e.target.value)}
                placeholder="e.g., 2025-08-01, *-1M"
                margin="normal"
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="End Date Filter"
                value={localFilters.dataf || ''}
                onChange={(e) => handleInputChange('dataf', e.target.value)}
                placeholder="e.g., 2025-08-01, *-1M"
                margin="normal"
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Job IDs"
                value={localFilters.id || ''}
                onChange={(e) => handleInputChange('id', e.target.value)}
                placeholder="Comma-separated IDs"
                margin="normal"
              />
            </Box>

            <Box>
              <Autocomplete
                fullWidth
                options={provinceOptions}
                value={provinceOptions.find(option => option.value === localFilters.locationGranular) || null}
                onChange={(event, newValue) => {
                  handleInputChange('locationGranular', newValue?.value || '');
                }}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Location Granular"
                    placeholder="Select Italian province"
                    margin="normal"
                  />
                )}
                sx={{ mt: 2 }}
              />
            </Box>
          </Box>

          <Box
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }}
            gap={2}
            sx={{ mt: 2 }}
          >
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={localFilters.applied || false}
                    onChange={(e) => handleInputChange('applied', e.target.checked)}
                  />
                }
                label="Applied"
              />
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={localFilters.ignore || false}
                    onChange={(e) => handleInputChange('ignore', e.target.checked)}
                  />
                }
                label="Ignore"
              />
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={localFilters.nostatus || false}
                    onChange={(e) => handleInputChange('nostatus', e.target.checked)}
                  />
                }
                label="No Status"
              />
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={localFilters.wait || false}
                    onChange={(e) => handleInputChange('wait', e.target.checked)}
                  />
                }
                label="Wait"
              />
            </Box>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap={2} sx={{ mt: 4 }}>
            <Button
              type="button"
              onClick={handleReset}
              variant="outlined"
              color="secondary"
            >
              Reset
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}