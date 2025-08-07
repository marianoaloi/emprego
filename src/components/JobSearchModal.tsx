'use client';

import { useState } from 'react';
import { JobSearchFilter, RemoteWorkType, SystemRecruiterType, LanguageCode, DEFAULT_JOB_FILTER } from '@/types/job.filter.types';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  FormGrid,
  CheckboxGrid,
  FormField,
  Label,
  Input,
  Select,
  CheckboxContainer,
  Checkbox,
  CheckboxLabel,
  ButtonContainer,
  SecondaryButton,
  PrimaryButton
} from './JobSearchModal.styled';

interface JobSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JobSearchModal({ isOpen, onClose }: JobSearchModalProps) {
  const [filters, setFilters] = useState<JobSearchFilter>(DEFAULT_JOB_FILTER);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof JobSearchFilter, value: string | number | boolean) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Applied filters:', filters);
    onClose();
  };

  const handleReset = () => {
    setFilters(DEFAULT_JOB_FILTER);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Job Search Filters</ModalTitle>
          <CloseButton onClick={onClose}>
            ×
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormGrid>
            <FormField>
              <Label>
                Job Title
              </Label>
              <Input
                type="text"
                value={filters.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter job title"
              />
            </FormField>

            <FormField>
              <Label>
                Company Name
              </Label>
              <Input
                type="text"
                value={filters.companyName || ''}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter company name"
              />
            </FormField>

            <FormField>
              <Label>
                Country
              </Label>
              <Input
                type="text"
                value={filters.country || ''}
                onChange={(e) => handleInputChange('country', e.target.value)}
                placeholder="Enter country"
              />
            </FormField>

            <FormField>
              <Label>
                Location
              </Label>
              <Input
                type="text"
                value={filters.formattedLocation || ''}
                onChange={(e) => handleInputChange('formattedLocation', e.target.value)}
                placeholder="Enter location"
              />
            </FormField>

            <FormField>
              <Label>
                Remote Work Type
              </Label>
              <Select
                value={filters.remote || ''}
                onChange={(e) => handleInputChange('remote', e.target.value as RemoteWorkType)}
              >
                <option value="">Select remote type</option>
                <option value="H">Hybrid</option>
                <option value="R">Remote</option>
                <option value="O">On-site</option>
              </Select>
            </FormField>

            <FormField>
              <Label>
                System Recruiter
              </Label>
              <Select
                value={filters.systemRecruter || ''}
                onChange={(e) => handleInputChange('systemRecruter', e.target.value as SystemRecruiterType)}
              >
                <option value="">Select recruiter type</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Others">Others</option>
                <option value="Empty">Empty</option>
              </Select>
            </FormField>

            <FormField>
              <Label>
                Language
              </Label>
              <Select
                value={filters.lang || ''}
                onChange={(e) => handleInputChange('lang', e.target.value as LanguageCode)}
              >
                <option value="">Select language</option>
                <option value="pt">Portuguese</option>
                <option value="it">Italian</option>
                <option value="en">English</option>
              </Select>
            </FormField>

            <FormField>
              <Label>
                Limit
              </Label>
              <Input
                type="number"
                value={filters.limit || ''}
                onChange={(e) => handleInputChange('limit', parseInt(e.target.value) || 0)}
                placeholder="Enter limit"
                min="1"
              />
            </FormField>

            <FormField>
              <Label>
                Start Date Filter
              </Label>
              <Input
                type="text"
                value={filters.datai || ''}
                onChange={(e) => handleInputChange('datai', e.target.value)}
                placeholder="e.g., -7d, -1M"
              />
            </FormField>

            <FormField>
              <Label>
                End Date Filter
              </Label>
              <Input
                type="text"
                value={filters.dataf || ''}
                onChange={(e) => handleInputChange('dataf', e.target.value)}
                placeholder="e.g., -7d, -1M"
              />
            </FormField>

            <FormField>
              <Label>
                Job IDs
              </Label>
              <Input
                type="text"
                value={filters.id || ''}
                onChange={(e) => handleInputChange('id', e.target.value)}
                placeholder="Comma-separated IDs"
              />
            </FormField>

            <FormField>
              <Label>
                Location Granular
              </Label>
              <Input
                type="text"
                value={filters.locationGranular || ''}
                onChange={(e) => handleInputChange('locationGranular', e.target.value)}
                placeholder="Enter granular location"
              />
            </FormField>
          </FormGrid>

          <CheckboxGrid>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                id="applied"
                checked={filters.applied || false}
                onChange={(e) => handleInputChange('applied', e.target.checked)}
              />
              <CheckboxLabel htmlFor="applied">
                Applied
              </CheckboxLabel>
            </CheckboxContainer>

            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                id="ignore"
                checked={filters.ignore || false}
                onChange={(e) => handleInputChange('ignore', e.target.checked)}
              />
              <CheckboxLabel htmlFor="ignore">
                Ignore
              </CheckboxLabel>
            </CheckboxContainer>

            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                id="nostatus"
                checked={filters.nostatus || false}
                onChange={(e) => handleInputChange('nostatus', e.target.checked)}
              />
              <CheckboxLabel htmlFor="nostatus">
                No Status
              </CheckboxLabel>
            </CheckboxContainer>

            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                id="wait"
                checked={filters.wait || false}
                onChange={(e) => handleInputChange('wait', e.target.checked)}
              />
              <CheckboxLabel htmlFor="wait">
                Wait
              </CheckboxLabel>
            </CheckboxContainer>
          </CheckboxGrid>

          <ButtonContainer>
            <SecondaryButton
              type="button"
              onClick={handleReset}
            >
              Reset
            </SecondaryButton>
            <SecondaryButton
              type="button"
              onClick={onClose}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              type="submit"
            >
              Apply Filters
            </PrimaryButton>
          </ButtonContainer>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
}