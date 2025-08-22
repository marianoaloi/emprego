import styled from '@emotion/styled';

export const PersonalInfoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Name = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
`;

export const ContactInfo = styled.div`
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

export const ContactItem = styled.span`
  color: inherit;
`;

export const EmailLink = styled.a`
  color: inherit;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;