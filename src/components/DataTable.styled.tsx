import styled from '@emotion/styled';

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