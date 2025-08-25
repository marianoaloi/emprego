import styled from '@emotion/styled';

export const SummaryContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const SummaryTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  color: #1f2937;
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 0.25rem;
`;

export const SummaryContent = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
  color: #374151;
  text-align: justify;
  
  text-indent: calc(var(--spacing) * 5);
  
  &:last-child {
    margin-bottom: 0;
  }
`;