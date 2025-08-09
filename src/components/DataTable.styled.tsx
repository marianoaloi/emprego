import styled from '@emotion/styled';
import { Card, CardHeader, CardContent, CardActions } from '@mui/material';

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const Spinner = styled.div`
  animation: spin 1s linear infinite;
  border-radius: 50%;
  height: 8rem;
  width: 8rem;
  border: 2px solid transparent;
  border-bottom-color: #2563eb;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorContainer = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fca5a5;
  color: #b91c1c;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  position: relative;
`;

export const ErrorTitle = styled.strong`
  font-weight: 700;
`;

export const ErrorMessage = styled.span`
  display: block;
  
  @media (min-width: 640px) {
    display: inline;
  }
`;

export const NoDataContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
`;

export const Table = styled.table`
  width: 100%;
  font-size: 0.875rem;
  text-align: left;
  color: #6b7280;
`;

export const TableHead = styled.thead`
  font-size: 0.75rem;
  color: #374151;
  text-transform: uppercase;
  background-color: #f9fafb;
`;

export const TableRow = styled.tr`
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  
  &:hover {
    background-color: #f9fafb;
  }
`;

export const TableHeader = styled.th`
  padding: 0.75rem 1.5rem;
`;

export const TableCell = styled.td`
  padding: 1rem 1.5rem;
`;

export const JobLink = styled.a`
  color: #2563eb;
  
  &:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }
`;

export const TruncatedContent = styled.div`
  max-width: 20rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ObjectPlaceholder = styled.span`
  color: #9ca3af;
`;

export const FooterInfo = styled.div`
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  font-size: 0.875rem;
  color: #4b5563;
`;

// New Job Cards Layout Components
export const JobsGridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 1.5rem;
    padding: 1rem 0;
    align-items: start;
    justify-items: start;
`;

interface JobCardProps {
  appliedbyme?: string;
  ignore?: string;
  wait?: string;
}

export const JobCard = styled(Card)<JobCardProps>`
  && {
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    background-color: ${({ appliedbyme, ignore, wait }) => {
      if (appliedbyme) return '#dcfce7'; // Light green
      if (ignore) return '#fecaca'; // Light red
      if (wait) return '#fef3c7'; // Light yellow
      return 'white'; // Default white background
    }};
    
    &:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
    }
  }
`;

export const JobCardHeader = styled(CardHeader)`
  && {
    padding: 1rem 1.5rem 0.5rem 1.5rem;
    
    .MuiCardHeader-title {
      font-size: 1.125rem;
      font-weight: 600;
      line-height: 1.4;
      cursor: pointer;
      color: #1f2937;
      
      &:hover {
        color: #2563eb;
        text-decoration: underline;
      }
    }
    
    .MuiCardHeader-subheader {
      background-color: #1e3a8a;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      margin-top: 0.5rem;
      display: inline-block;
    }
  }
`;

export const JobCardContent = styled(CardContent)`
  && {
    padding: 0.5rem 1.5rem;
    padding-bottom: 0;
    
    .job-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #6b7280;
    }
    
    .job-detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .job-detail-label {
      font-weight: 500;
      color: #374151;
    }
  }
`;

export const JobCardActions = styled(CardActions)`
  && {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .actions-group {
      display: flex;
      gap: 0.5rem;
    }
    
    .MuiIconButton-root {
      padding: 8px;
      
      &.go-action {
        color: #059669;
        &:hover { background-color: rgba(5, 150, 105, 0.1); }
      }
      
      &.reject-action {
        color: #dc2626;
        &:hover { background-color: rgba(220, 38, 38, 0.1); }
      }
      
      &.wait-action {
        color: #d97706;
        &:hover { background-color: rgba(217, 119, 6, 0.1); }
      }
      
      &.accept-action {
        color: #059669;
        &:hover { background-color: rgba(5, 150, 105, 0.1); }
      }
      
      &.lock-action {
        color: #6b7280;
        &:hover { background-color: rgba(107, 114, 128, 0.1); }
      }
    }
  }
`;

// Subheader Styled Components
export const SubheaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CompanyNameSpan = styled.span`
  // No additional styling needed - inherits from parent CardHeader subheader styles
`;

export const LastUpdateSpan = styled.span`
  font-size: 0.8em;
  color: #eee;
  font-weight: 400;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;