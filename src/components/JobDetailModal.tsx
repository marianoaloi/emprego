'use client';

import React, { useState } from 'react';

import { httpsCallable } from "firebase/functions";
import { Button, Typography, Tooltip, IconButton, Box, CircularProgress } from '@mui/material';
import {
  Close as CloseIcon,
  OpenInNew as OpenInNewIcon,
  ThumbDown as ThumbDownIcon,
  HourglassEmpty as HourglassEmptyIcon,
  ThumbUp as ThumbUpIcon,
  Lock as LockIcon,
  ContentCopy as ContentCopyIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { JobPosting } from '@/types/job.types';
import JobDescription from './JobDescription';
import SkillsGrid from './SkillsGrid';
import { useAppSelector } from '@/lib/hooks';
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
  ActionButtonsGroup,
  LogoAzienda
} from './JobDetailModal.styled';
import { useAuth } from './auth/AuthContext';
import { functions } from './auth/firebaseConfig';
import skill from '../../functions/src/skill';

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

  const [copySuccess, setCopySuccess] = useState(false);
  const { user, getAuthToken } = useAuth();
  const [loading, setLoading] = useState(false);

  // Get job description from Redux store
  const jobDescription = useAppSelector(state => state.textJob.descriptions);
  const skillsJob = useAppSelector(state => state.skills.skills);


  if (!job) return null;

  const handleCopyDescription = async () => {
    try {
      // Get the job description text from the Redux store or fallback to job.description
      const textToCopy = jobDescription?.text || job.description || 'No description available';
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Hide success message after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  const handleOpenCV = async () => {
    setLoading(true);
    const generateCv = httpsCallable(functions, "generateCv");
    try {
      const token = await getAuthToken();
      const result = await generateCv({
        jobDescription: job.description,
        authToken: token,
        lang: job.lang,
        skills: skillsJob ? skillsJob.match.map(skill => skill.localizedSkillDisplayName) : [],
      });
      const cvData = result.data;
      // Store CV data and opportunity ID in local storage to pass to the CV page
      localStorage.setItem("cvData", JSON.stringify(cvData));
      localStorage.setItem("opportunityId", job._id);
      window.open('/cv', '_blank');
    } catch (error) {
      console.error("Error generating CV:", error);
      alert("Error generating CV. Please try again.");
    } finally {
      setLoading(false);
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

  const JobDetailsInPart = (

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
          <div className="value" title={new Date(job.listedAt).toString()}>{job.listedAt ? new Date(job.listedAt).toLocaleDateString() : 'N/A'}</div>
        </DetailItem>
        <DetailItem>
          <div className="label">Original At</div>
          <div className="value" title={new Date(job.originalListedAt).toString()}>{job.originalListedAt ? new Date(job.originalListedAt).toLocaleDateString() : 'N/A'}</div>
        </DetailItem>
        <DetailItem>
          <div className="label">Last Update</div>
          <div className="value" title={new Date(job.lastupdate).toString()}>{job.lastupdate ? new Date(job.lastupdate).toLocaleDateString() : 'N/A'}</div>
        </DetailItem>
        <DetailItem>
          <div className="label">Expires At</div>
          <div className="value" title={new Date(job.expireAt).toString()}>{job.expireAt ? new Date(job.expireAt).toLocaleDateString() : 'N/A'}</div>
        </DetailItem>
      </JobDetailsGrid>
    </ContentSection>

  )

  const JobSallaryInPart = (
    <>
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

          {/* Compensation Breakdown */}
          {job.salaryInsights.compensationBreakdown && Object.keys(job.salaryInsights.compensationBreakdown).length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#374151' }}>
                Compensation Breakdown:
              </Typography>
              {Object.entries(job.salaryInsights.compensationBreakdown).map(([key, breakdown]) => (
                <Box
                  key={key}
                  sx={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    p: 1.5,
                    mb: 1,
                    backgroundColor: '#f9fafb'
                  }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#1f2937' }}>
                    {key}
                  </Typography>
                  <JobDetailsGrid>
                    <DetailItem>
                      <div className="label">Salary Range</div>
                      <div className="value">
                        {breakdown.minSalary && breakdown.maxSalary
                          ? `${breakdown.minSalary} - ${breakdown.maxSalary} ${breakdown.currencyCode || ''}`
                          : breakdown.minSalary || breakdown.maxSalary || 'N/A'
                        }
                      </div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Pay Period</div>
                      <div className="value">{breakdown.payPeriod || 'N/A'}</div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Currency</div>
                      <div className="value">{breakdown.currencyCode || 'N/A'}</div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Type</div>
                      <div className="value">{breakdown.compensationType || 'N/A'}</div>
                    </DetailItem>
                  </JobDetailsGrid>
                </Box>
              ))}
            </Box>
          )}
        </ContentSection>
      )}
    </>
  )

  const JobDescriptionTag = (
    <ContentSection>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <SectionTitle style={{ margin: 0 }}>Job Description</SectionTitle>
        <Tooltip title="Copy job description">
          <IconButton
            onClick={handleCopyDescription}
            size="small"
            sx={{
              color: '#6b7280',
              '&:hover': { color: '#374151' }
            }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {job._id}
        {copySuccess && (
          <Typography
            variant="caption"
            sx={{
              color: '#10b981',
              fontWeight: 500,
              ml: 1
            }}
          >
            Copied!
          </Typography>
        )}
      </Box>
      <JobDescription jobId={job._id} />
    </ContentSection>
  )

  const boxLoad = (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
      BUILDING CURRICULUM VITAE
    </Box>
  )

  const contentBody = (
    <>

      <StyledDialogContent>
        <CompanyHeader>
          <div className="company-name">{job.companyName}</div>
          <div className="job-id">ID: {job._id}</div>

          <LogoAzienda size={70} alt={job.companyName} src={job.foto} />
        </CompanyHeader>

        {skillsJob &&
          <ContentSection>
            <SkillsGrid />
          </ContentSection>
        }

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


        {JobDetailsInPart}
        {JobSallaryInPart}


        {JobDescriptionTag}

        <ContentSection>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <SectionTitle>Job Status</SectionTitle>
            <Box display="flex" gap={1} flexWrap="wrap">
              {getStatusChips()}
            </Box>
          </Box>
        </ContentSection>

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
              onClick={() => handleGoAction(job)}
            >
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
          {user &&
            <>
              <Tooltip title="Open CV">
                <IconButton
                  onClick={handleOpenCV}
                  sx={{
                    color: '#10b981',
                    '&:hover': {
                      color: '#059669',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)'
                    }
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={job.ignore ? "Undo Ignore" : "Ignore Job"}>
                <IconButton
                  className="reject-action"
                  onClick={() => handleRejectAction(job)}
                >
                  <ThumbDownIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={job.wait ? "Undo Wait" : "Mark as Waiting"}>
                <IconButton
                  className="wait-action"
                  onClick={() => handleWaitAction(job)}
                >
                  <HourglassEmptyIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={job.appliedbyme ? "Undo Applied" : "Mark as Applied"}>
                <IconButton
                  className="accept-action"
                  onClick={() => handleAcceptAction(job)}
                >
                  <ThumbUpIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={job.closed ? "Reopen Job" : "Close Job"}>
                <IconButton
                  className="lock-action"
                  onClick={() => handleLockAction(job)}
                >
                  <LockIcon />
                </IconButton>
              </Tooltip>
            </>}
        </ActionButtonsGroup>
      </StyledDialogActions>
    </>
  )
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        <Typography >{job.title} | {job.workplaceTypes} | {job.country} | {job.formattedEmploymentStatus} | {`AP:${job.applies}`}</Typography>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>
      {loading ? boxLoad : contentBody}
    </StyledDialog>
  );
}