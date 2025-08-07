'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { DataItem } from '@/lib/features/data/dataSlice';
import { fetchData } from '@/lib/features/data/dataTruck';
import { JobPostingDisplay } from '@/types/job.types';
import {
  LoadingContainer,
  Spinner,
  ErrorContainer,
  ErrorTitle,
  ErrorMessage,
  NoDataContainer,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  JobLink,
  TruncatedContent,
  ObjectPlaceholder,
  FooterInfo
} from './DataTable.styled';

export default function DataTable() {
  const dispatch = useAppDispatch();
  const { items, displayJobs, loading, error } = useAppSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
  const dataToDisplay = displayJobs.length > 0 ? displayJobs : items;
  const isJobData = displayJobs.length > 0;

  if (!dataToDisplay || dataToDisplay.length === 0) {
    return (
      <NoDataContainer>
        No data available
      </NoDataContainer>
    );
  }

  // Define columns based on data type
  const jobColumns = ['title', 'company', 'location', 'employmentType', 'applies', 'views', 'listedDate'];
  const columns = isJobData ? jobColumns : Object.keys(dataToDisplay[0] || {});

  // Format column headers
  const formatColumnHeader = (column: string): string => {
    return column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  // Render cell content
  const renderCellContent = (item: DataItem | JobPostingDisplay, column: string): React.ReactNode => {
    const value = (item as Record<string, unknown>)[column];
    
    if (isJobData && column === 'title' && (item as JobPostingDisplay).applyUrl) {
      return (
        <JobLink 
          href={(item as JobPostingDisplay).applyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {String(value)}
        </JobLink>
      );
    }
    
    if (column === 'description' && typeof value === 'string' && value.length > 100) {
      return (
        <TruncatedContent title={value}>
          {value.substring(0, 100)}...
        </TruncatedContent>
      );
    }
    
    if (typeof value === 'object' && value !== null) {
      return <ObjectPlaceholder>Object</ObjectPlaceholder>;
    }
    
    return String(value || '');
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableHeader key={column} scope="col">
                {formatColumnHeader(column)}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <tbody>
          {dataToDisplay.map((item: DataItem | JobPostingDisplay, index) => (
            <TableRow key={String((item as Record<string, unknown>).id || (item as Record<string, unknown>)._id || index)}>
              {columns.map((column) => (
                <TableCell key={column}>
                  {renderCellContent(item, column)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
      {isJobData && (
        <FooterInfo>
          Displaying {dataToDisplay.length} job posting{dataToDisplay.length !== 1 ? 's' : ''}
        </FooterInfo>
      )}
    </TableContainer>
  );
}