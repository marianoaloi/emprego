import styled from '@emotion/styled';

export const SkillsContainer = styled.div`
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

export const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SkillItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SkillName = styled.div`
  width: 6rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

export const ProgressContainer = styled.div`
  flex: 1;
`;

export const ProgressBar = styled.div`
  width: 100%;
  background-color: #d1d5db;
  border-radius: 9999px;
  height: 0.5rem;
`;

export const ProgressFill = styled.div<{ width: number }>`
  background-color: #3b82f6;
  height: 0.5rem;
  border-radius: 9999px;
  transition: all 0.3s;
  width: ${({ width }) => width}%;
`;