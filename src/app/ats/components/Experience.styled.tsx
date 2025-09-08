import styled from '@emotion/styled';

export const ExperienceContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const ExperienceTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  color: #1f2937;
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 0.25rem;
`;

export const ExperienceItem = styled.div`
  margin-bottom: 1.25rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

export const JobTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
  color: #1f2937;
`;

export const CompanyInfo = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
  margin: 0 0 0.25rem 0;
`;

export const Duration = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0 0 0.75rem 0;
  font-style: italic;
`;

export const JobDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
  color: #374151;
  text-align: justify;
  text-indent: calc(var(--spacing) * 5);

`;

export const TechnologiesList = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  
  strong {
    color: #4b5563;
  }
`;