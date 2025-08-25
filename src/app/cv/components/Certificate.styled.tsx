import styled from '@emotion/styled';

export const CertificateContainer = styled.div`
  margin-bottom: 2rem;
`;

export const CertificateTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 2px solid #9ca3af;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

export const CertificateGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const CertificateCard = styled.div`
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.75rem;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
`;

export const CertificateName = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CertificateInfo = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
`;