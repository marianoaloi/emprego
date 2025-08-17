'use client';

import { useEffect, useState } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '@mui/material';
import moment from 'moment-timezone';
import {
  OpenInNew as OpenInNewIcon,
  ThumbDown as ThumbDownIcon,
  HourglassEmpty as HourglassEmptyIcon,
  ThumbUp as ThumbUpIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchData, fetchDataCount, appliedbyme, closeJob, ignoreJob, waitJob } from '@/lib/features/data/dataTruck';
import {
  LoadingContainer,
  Spinner,
  ErrorContainer,
  ErrorTitle,
  ErrorMessage,
  NoDataContainer,
  JobsGridContainer,
  JobCard,
  JobCardHeader,
  JobCardContent,
  JobCardActions,
  FooterInfo,
  SubheaderContainer,
  CompanyNameSpan,
  LastUpdateSpan
} from './DataTable.styled';
import { JobPosting } from '@/types/job.types';
import JobDetailModal from './JobDetailModal';
import { useAuth } from './auth/AuthContext';

export default function DataTable() {
  const dispatch = useAppDispatch();
  const { items, jobPostings, loading, error, totalCount, countLoading } = useAppSelector((state) => state.data);
  const { filters } = useAppSelector((state) => state.filter);

  
  const { getAuthToken } = useAuth();

  // Modal state
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchData(filters));
    dispatch(fetchDataCount(filters));
  }, [dispatch, filters]);

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer role="alert">
        <ErrorTitle>Error:</ErrorTitle>
        <ErrorMessage> {error}</ErrorMessage>
      </ErrorContainer>
    );
  }

  // Determine which data to display - prioritize job postings if available
  const dataToDisplay = jobPostings.length > 0 ? jobPostings : items;
  const isJobData = jobPostings.length > 0;

  // Format lastupdate timestamp
  const formatLastUpdate = (timestamp: number) => {
    return moment(timestamp).format('MM/DD HH:mm');
  };

  // Format complete date for tooltip
  const formatCompleteDateForTooltip = (timestamp: number) => {
    return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
  };

  if (!dataToDisplay || dataToDisplay.length === 0) {
    return (
      <NoDataContainer>
        No data available
      </NoDataContainer>
    );
  }

  // Action handlers
  const handleGoAction = (job: JobPosting) => {
    if (job._id) {
      window.open(`https://www.linkedin.com/jobs/view/${job._id}`, '_blank');
    } else {
      console.log('No direct apply URL available for job:', job._id);
    }
  };

  const handleRejectAction = (job: JobPosting) => {
    if (job._id) {
      getAuthToken().then(token => dispatch(ignoreJob({ jobId: job._id, undo: job.ignore ? true : false , token })))
      handleModalClose()
    }
  };

  const handleWaitAction = (job: JobPosting) => {
    if (job._id) {
      getAuthToken().then(token => dispatch(waitJob({ jobId: job._id, undo: job.wait ? true : false , token })))
      handleModalClose()
    }
  };

  const handleAcceptAction = (job: JobPosting) => {
    if (job._id) {
      getAuthToken().then(token => dispatch(appliedbyme({ jobId: job._id, undo: job.appliedbyme ? true : false , token })))
      handleModalClose()
    }
  };

  const handleLockAction = (job: JobPosting) => {
    if (job._id) {
      getAuthToken().then(token => dispatch(closeJob({ jobId: job._id, undo: job.closed ? true : false , token })))
      handleModalClose()
    }
  };

  const handleTitleClick = (job: JobPosting) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  // Render individual job card
  const renderJobCard = (job: JobPosting) => {
    return (
      <JobCard
        key={job._id}
        appliedbyme={job.appliedbyme}
        ignore={job.ignore}
        wait={job.wait}
      >
        <JobCardHeader
          title={
            <div onClick={() => handleTitleClick(job)}>
              {job.title}
            </div>
          }
          subheader={
            <SubheaderContainer>
              <CompanyNameSpan>{job.companyName}</CompanyNameSpan>
              <Tooltip title={formatCompleteDateForTooltip(job.lastupdate)}>
                <LastUpdateSpan>
                  {formatLastUpdate(job.lastupdate)}
                </LastUpdateSpan>
              </Tooltip>
            </SubheaderContainer>
          }
        />

        <JobCardContent>

          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: '100%' }} size="small" aria-label="a dense table">
              <TableBody>
                <TableRow>
                  <TableCell title='lang'>{job.lang}</TableCell>
                  <TableCell title='applicantTrackingSystem'>{job.applicantTrackingSystem ? job.applicantTrackingSystem == 'LinkedIn' ? 'L' : 'O' : '-'}</TableCell>
                  <TableCell title={'employmentStatus ' + job.employmentStatus}>{job.employmentStatus ? job.employmentStatus.split('')[0] : '-'}</TableCell>
                  <TableCell title='country'>{job.country}</TableCell>
                  <TableCell title='workplaceTypes'>{job.workplaceTypes}</TableCell>
                  <TableCell title='workRemoteAllowed'>{job.workRemoteAllowed}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

        </JobCardContent>

        <JobCardActions>
          <div className="actions-group">
            <Tooltip title="Go to Job">
              <IconButton
                className="go-action"
                onClick={() => handleGoAction(job)}
                size="small"
              >
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Reject Job">
              <IconButton
                className="reject-action"
                onClick={() => handleRejectAction(job)}
                size="small"
              >
                <ThumbDownIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Wait">
              <IconButton
                className="wait-action"
                onClick={() => handleWaitAction(job)}
                size="small"
              >
                <HourglassEmptyIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Accept Job">
              <IconButton
                className="accept-action"
                onClick={() => handleAcceptAction(job)}
                size="small"
              >
                <ThumbUpIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Lock Job">
              <IconButton
                className="lock-action"
                onClick={() => handleLockAction(job)}
                size="small"
              >
                <LockIcon />
              </IconButton>
            </Tooltip>
          </div>
        </JobCardActions>
      </JobCard>
    );
  };

  return (
    <div>
      {isJobData ? (
        <>
          <FooterInfo>
            Displaying {dataToDisplay.length} job posting{dataToDisplay.length !== 1 ? 's' : ''}
            {countLoading ? (
              <span> | Loading total count...</span>
            ) : (
              <span> | Total available: {totalCount.toLocaleString()}</span>
            )}
          </FooterInfo>
          <JobsGridContainer>
            {(dataToDisplay as JobPosting[]).map((job) => renderJobCard(job))}
          </JobsGridContainer>
        </>
      ) : (
        <NoDataContainer>
          <Typography variant="h6" color="textSecondary">
            No job postings available
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Use the filter to search for job opportunities
          </Typography>
        </NoDataContainer>
      )}

      {/* Job Detail Modal */}
      <JobDetailModal
        job={selectedJob}
        open={isModalOpen}
        onClose={handleModalClose}
        handleGoAction={handleGoAction}
        handleRejectAction={handleRejectAction}
        handleWaitAction={handleWaitAction}
        handleAcceptAction={handleAcceptAction}
        handleLockAction={handleLockAction}
      />
    </div>
  );
}