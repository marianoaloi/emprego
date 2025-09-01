import styled from '@emotion/styled';

export const CertificateContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const CertificateTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  color: #1f2937;
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 0.25rem;
`;

export const CertificateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CertificateItem = styled.div`
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CertificateName = styled.h3`
  font-size: 0.875rem;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
  color: #1f2937;
`;

export const CertificateInfo = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0 0 0.125rem 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;