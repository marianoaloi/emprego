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
  margin-bottom: 1rem;
  
  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 1rem;
  }
`;

export const ActionButton = styled.button<{ variant: 'indigo' | 'green' | 'blue' | 'gray' }>`
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: none;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s;
  outline: none;

  ${({ variant }) => {
    switch (variant) {
      case 'indigo':
        return `
          background-color: #4f46e5;
          &:hover {
            background-color: #4338ca;
          }
          &:focus {
            box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.5);
          }
        `;
      case 'green':
        return `
          background-color: #059669;
          &:hover {
            background-color: #047857;
          }
          &:focus {
            box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.5);
          }
        `;
      case 'blue':
        return `
          background-color: #2563eb;
          &:hover {
            background-color: #1d4ed8;
          }
          &:focus {
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.5);
          }
        `;
      case 'gray':
        return `
          background-color: #4b5563;
          &:hover {
            background-color: #374151;
          }
          &:focus {
            box-shadow: 0 0 0 2px rgba(75, 85, 99, 0.5);
          }
        `;
      default:
        return '';
    }
  }}
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