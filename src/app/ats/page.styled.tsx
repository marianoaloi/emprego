import styled from '@emotion/styled';

export const ATSPageContainer = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;


export const JumpLine = styled.div``

export const LinkControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
export const LinkCv = styled.span`
  cursor: pointer;  
  color: blue;
  text-decoration: underline;
  margin-left: 1rem;
`;

export const ATSContainer = styled.div`
  max-width: 60rem;
  width: 100%;
  background-color: white;
  padding: 2rem;
  font-family: 'Arial', 'Helvetica', sans-serif;
  line-height: 1.6;
  color: #333;
`;

export const ATSContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ATSSection = styled.section`
  margin-bottom: 0.25rem;
  
  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.25rem;
  }
`;


export const LoadingContainer = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem;
`;

export const LoadingText = styled.div`
  font-size: 1.125rem;
`;