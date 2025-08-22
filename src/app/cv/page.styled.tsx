import styled from '@emotion/styled';

export const CVPageContainer = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const JumpLine = styled.div``

export const JumpLineControl = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
`;

export const JumpLineInput = styled.input`
  width: 60px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

export const JumpLineLabel = styled.label`
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 500;
`;

export const CVContainer = styled.div`
  max-width: 56rem;
  width: 100%;
  background-color: white;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

export const CVContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
`;

export const EducationSection = styled.div`
  margin-bottom: 2rem;
`;

export const EducationTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 2px solid #9ca3af;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

export const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
`;

export const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
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

  display: block;
  margin: 10px 0px;

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