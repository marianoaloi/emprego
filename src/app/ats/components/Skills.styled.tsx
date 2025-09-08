import styled from '@emotion/styled';

export const SkillsContainer = styled.div`
  margin-bottom: .25rem;
`;

export const SkillsTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  color: #1f2937;
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 0.25rem;
`;

export const SkillsList = styled.ul`
  list-style: none;
  padding: 0.25rem 0.5rem;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;padding

 

    justify-content: start;
    align-items: center;
    justify-items: start;
}
`;

export const SkillItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  font-size: 0.875rem;
`;

export const SkillName = styled.span`
  color: #374151;
  font-weight: 500;
`;

export const SkillLevel = styled.span`
  color: #6b7280;
  font-size: 0.75rem;
  font-style: italic;
  padding-left: 0.5rem;
`;