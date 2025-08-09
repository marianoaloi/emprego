'use client';

import React from 'react';
import { Button, Typography, Tooltip, IconButton, Box } from '@mui/material';
import {
  Close as CloseIcon,
  OpenInNew as OpenInNewIcon,
  ThumbDown as ThumbDownIcon,
  HourglassEmpty as HourglassEmptyIcon,
  ThumbUp as ThumbUpIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { JobPosting } from '@/types/job.types';
import { useAppDispatch } from '@/lib/hooks';
import { appliedbyme, closeJob, ignoreJob, waitJob } from '@/lib/features/data/dataTruck';
import {
  StyledDialog,
  StyledDialogTitle,
  CloseButton,
  StyledDialogContent,
  CompanyHeader,
  ContentSection,
  SectionTitle,
  JobDetailsGrid,
  DetailItem,
  StatusChip,
  LLMContent,
  StyledDialogActions,
  ActionButtonsGroup
} from './JobDetailModal.styled';

interface JobDetailModalProps {
  job: JobPosting | null;
  open: boolean;
  onClose: () => void;
  handleGoAction: any;
  handleRejectAction: any;
  handleWaitAction: any;
  handleAcceptAction: any;
  handleLockAction: any;
}

export default function JobDetailModal({ job, open, onClose,
  handleGoAction,
  handleRejectAction,
  handleWaitAction,
  handleAcceptAction,
  handleLockAction }: JobDetailModalProps) {
  const dispatch = useAppDispatch();

  if (!job) return null;

  // Format dates for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'Invalid date';
    }
  };

  // Get status chips
  const getStatusChips = () => {
    const chips = [];
    if (job.appliedbyme) {
      chips.push(<StatusChip key="applied" status="applied" label="Applied" size="small" />);
    }
    if (job.ignore) {
      chips.push(<StatusChip key="ignored" status="ignored" label="Ignored" size="small" />);
    }
    if (job.wait) {
      chips.push(<StatusChip key="waiting" status="waiting" label="Waiting" size="small" />);
    }
    if (job.closed) {
      chips.push(<StatusChip key="closed" status="closed" label="Closed" size="small" />);
    }
    return chips;
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        <Typography variant="h6">{job.title} | {job.workplaceTypes} | {job.country} | {job.formattedEmploymentStatus}</Typography>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        <CompanyHeader>
          <div className="company-name">{job.companyName}</div>
          <div className="job-id">ID: {job._id}</div>
        </CompanyHeader>
        
        {job.llm && (
          <ContentSection>
            <SectionTitle>Job Description (AI Analysis)</SectionTitle>
            <LLMContent>
              <div
                className="llm-content"
                dangerouslySetInnerHTML={{ __html: job.llm }}
              />
            </LLMContent>
          </ContentSection>
        )}

        {job.description && (
          <ContentSection>
            <SectionTitle>Original Description</SectionTitle>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {job.description}
            </Typography>
          </ContentSection>
        )}

        <ContentSection>
          <SectionTitle>Job Details</SectionTitle>
          <JobDetailsGrid>
            <DetailItem>
              <div className="label">Location</div>
              <div className="value">{job.formattedLocation || 'N/A'}</div>
            </DetailItem>
            <DetailItem>
              <div className="label">Experience Level</div>
              <div className="value">{job.formattedExperienceLevel || 'N/A'}</div>
            </DetailItem>
            <DetailItem>
              <div className="label">Remote Allowed</div>
              <div className="value">{job.workRemoteAllowed ? 'Yes' : 'No'}</div>
            </DetailItem>
            <DetailItem>
              <div className="label">Language</div>
              <div className="value">{job.lang || 'N/A'}</div>
            </DetailItem>
            <DetailItem>
              <div className="label">Tracking System</div>
              <div className="value">{job.applicantTrackingSystem || 'N/A'}</div>
            </DetailItem>
            <DetailItem>
              <div className="label">Applications</div>
              <div className="value">{job.applies || 0}</div>
            </DetailItem>
            <DetailItem>
              <div className="label">Listed At</div>
              <div className="value">{job.listedAt ? new Date(job.listedAt * 1000).toLocaleDateString() : 'N/A'}</div>
            </DetailItem>
            <DetailItem>
              <div className="label">Last Update</div>
              <div className="value">{job.lastupdate ? new Date(job.lastupdate * 1000).toLocaleDateString() : 'N/A'}</div>
            </DetailItem>
            <DetailItem>
              <div className="label">Expires At</div>
              <div className="value">{job.expireAt ? new Date(job.expireAt * 1000).toLocaleDateString() : 'N/A'}</div>
            </DetailItem>
          </JobDetailsGrid>
        </ContentSection>

        <ContentSection>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <SectionTitle>Job Status</SectionTitle>
            <Box display="flex" gap={1} flexWrap="wrap">
              {getStatusChips()}
            </Box>
          </Box>
        </ContentSection>


        {job.salaryInsights && (
          <ContentSection>
            <SectionTitle>Salary Information</SectionTitle>
            <JobDetailsGrid>
              <DetailItem>
                <div className="label">Provided by Employer</div>
                <div className="value">{job.salaryInsights.providedByEmployer ? 'Yes' : 'No'}</div>
              </DetailItem>
              <DetailItem>
                <div className="label">Compensation Available</div>
                <div className="value">{job.salaryInsights.jobCompensationAvailable ? 'Yes' : 'No'}</div>
              </DetailItem>
              <DetailItem>
                <div className="label">Insight Exists</div>
                <div className="value">{job.salaryInsights.insightExists ? 'Yes' : 'No'}</div>
              </DetailItem>
              <DetailItem>
                <div className="label">Compensation Source</div>
                <div className="value">{job.salaryInsights.compensationSource || 'N/A'}</div>
              </DetailItem>
            </JobDetailsGrid>
          </ContentSection>
        )}

      </StyledDialogContent>

      <StyledDialogActions>
        <Button
          variant="outlined"
          onClick={onClose}
          size="large"
        >
          Close
        </Button>

        <ActionButtonsGroup>
          <Tooltip title="Open Job">
            <IconButton
              className="go-action"
              onClick={handleGoAction}
            >
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={job.ignore ? "Undo Ignore" : "Ignore Job"}>
            <IconButton
              className="reject-action"
              onClick={handleRejectAction}
            >
              <ThumbDownIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={job.wait ? "Undo Wait" : "Mark as Waiting"}>
            <IconButton
              className="wait-action"
              onClick={handleWaitAction}
            >
              <HourglassEmptyIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={job.appliedbyme ? "Undo Applied" : "Mark as Applied"}>
            <IconButton
              className="accept-action"
              onClick={handleAcceptAction}
            >
              <ThumbUpIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={job.closed ? "Reopen Job" : "Close Job"}>
            <IconButton
              className="lock-action"
              onClick={handleLockAction}
            >
              <LockIcon />
            </IconButton>
          </Tooltip>
        </ActionButtonsGroup>
      </StyledDialogActions>
    </StyledDialog>
  );
}