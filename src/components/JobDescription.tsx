'use client';

import React, { useMemo } from 'react';
import { CircularProgress } from '@mui/material';
import {
  JobDescriptionContainer,
  LoadingContainer,
  ErrorContainer,
  FormattedContent,
  RetryButton,
  JobDetailBold,
  JobDetailHyperlink,
  JobDetailItalic,
  JobDetailLineBreak,
  JobDetailListOrdered,
  JobDetailListUnordered,
  JobDetailParagraph,
  JobDetailListItem,
  JobDetailSuperscript,
  JobDetailUnderline
} from './JobDescription.styled';
import {
  JobDescriptionProps
} from '@/types/job-description.types';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchJobText } from '@/lib/features/textJob/textJobTruck';
import { formatTextWithAttributes } from './processText/FormatText';


export default function JobDescription({ jobId, className }: JobDescriptionProps) {
  const dispatch = useAppDispatch();


  // Get description from Redux state

  const description = useAppSelector(state => state.textJob.descriptions);
  const loadingState = useAppSelector(state => state.textJob.loadingStates);

  const loading = loadingState?.loading || false;
  const error = loadingState?.error || null;


  const formattedContent = useMemo(() => {
    if (!description) return null;
    return formatTextWithAttributes(description.text, description.attributes);
  }, [description]);

  if (loading) {
    return (
      <JobDescriptionContainer className={className}>
        <LoadingContainer>
          <CircularProgress size={24} />
          <span style={{ marginLeft: '8px' }}>Loading job description...</span>
        </LoadingContainer>
      </JobDescriptionContainer>
    );
  }

  if (error) {
    return (
      <JobDescriptionContainer className={className}>
        <ErrorContainer>
          <div>Error loading job description: {error}</div>
          <RetryButton onClick={() => dispatch(fetchJobText(jobId))}>
            Retry
          </RetryButton>
        </ErrorContainer>
      </JobDescriptionContainer>
    );
  }

  if (!description) {
    return (
      <JobDescriptionContainer className={className}>
        <div style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
          No job description available
        </div>
      </JobDescriptionContainer>
    );
  }

  return (
    <JobDescriptionContainer className={className}>
      <FormattedContent>
        {formattedContent}
      </FormattedContent>
    </JobDescriptionContainer>
  );
}