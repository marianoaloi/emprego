import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

export const CVLoadPageContainer = styled.div`
  max-width: 64rem; /* max-w-4xl */
  margin-left: auto;
  margin-right: auto;
  padding: 1.5rem; /* p-6 */
`;

export const PageTitle = styled.h1`
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700; /* font-bold */
  margin-bottom: 1.5rem; /* mb-6 */
`;

export const CVForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem; /* space-y-8 */
`;

export const Section = styled.section`
  background-color: white; /* bg-white */
  padding: 1.5rem; /* p-6 */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow */
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem; /* text-2xl */
  font-weight: 600; /* font-semibold */
  margin-bottom: 1rem; /* mb-4 */
`;

export const EditorContainer = styled.div`
  border: 1px solid #d1d5db; /* border */
  border-radius: 0.375rem; /* rounded */
`;

export const SkillRow = styled.div`
  display: flex;
  gap: 1rem; /* gap-4 */
  margin-bottom: 1rem; /* mb-4 */
`;

export const FormInput = styled.input`
  border: 1px solid #d1d5db; /* border */
  padding: 0.75rem; /* p-3 */
  border-radius: 0.375rem; /* rounded */
  flex: 1;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }

  &.skill-level {
    width: 6rem; /* w-24 */
    flex: none;
  }
`;

export const FormSelect = styled.select`
  border: 1px solid #d1d5db; /* border */
  padding: 0.75rem; /* p-3 */
  border-radius: 0.375rem; /* rounded */
  width: 100%; /* w-full */

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

export const FormTextarea = styled.textarea`
  border: 1px solid #d1d5db; /* border */
  padding: 0.75rem; /* p-3 */
  border-radius: 0.375rem; /* rounded */
  width: 100%; /* w-full */
  height: 8rem; /* h-32 */

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'green' }>`
  padding: 0.75rem 1rem; /* px-4 py-2 */
  border-radius: 0.375rem; /* rounded */
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: #3b82f6; /* bg-blue-500 */
          color: white;
          &:hover { background-color: #2563eb; }
        `;
      case 'danger':
        return `
          background-color: #ef4444; /* bg-red-500 */
          color: white;
          &:hover { background-color: #dc2626; }
        `;
      case 'success':
        return `
          background-color: #10b981; /* bg-green-500 */
          color: white;
          &:hover { background-color: #059669; }
        `;
      case 'green':
        return `
          background-color: #16a34a; /* bg-green-600 */
          color: white;
          padding: 2rem; /* px-8 py-4 */
          border-radius: 0.5rem; /* rounded-lg */
          font-size: 1.125rem; /* text-lg */
          font-weight: 600; /* font-semibold */
          width: 100%;
          &:hover { background-color: #15803d; }
        `;
      default:
        return `
          background-color: #6b7280;
          color: white;
          &:hover { background-color: #4b5563; }
        `;
    }
  }}
`;

export const SmallButton = styled(Button)`
  padding: 0.5rem 0.75rem; /* px-3 py-2 */
  font-size: 0.875rem; /* text-sm */
`;

export const ExperienceCard = styled.div`
  border: 1px solid #d1d5db; /* border */
  padding: 1rem; /* p-4 */
  border-radius: 0.375rem; /* rounded */
  margin-bottom: 1rem; /* mb-4 */
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem; /* gap-4 */
  margin-bottom: 1rem; /* mb-4 */

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr; /* md:grid-cols-2 */
  }
`;

export const TechnologyRow = styled.div`
  display: flex;
  gap: 0.5rem; /* gap-2 */
  margin-bottom: 0.5rem; /* mb-2 */
`;

export const TechnologyInput = styled(FormInput)`
  flex: 1;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem; /* mb-4 */
`;

export const IconButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem; /* gap-2 */
`;

export const StyledIconButton = styled(IconButton)`
  && {
    color: #6b7280; /* text-gray-500 */

    &:hover {
      color: #374151; /* hover:text-gray-700 */
    }
  }
`;

export const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* gap-2 */
`;

export const FileInput = styled.input`
  flex: 1;
  font-size: 0.875rem; /* text-sm */
  color: #6b7280; /* text-gray-500 */

  &::-webkit-file-upload-button {
    margin-right: 1rem; /* file:mr-4 */
    padding: 0.5rem 1rem; /* file:py-2 file:px-4 */
    border-radius: 9999px; /* file:rounded-full */
    border: none; /* file:border-0 */
    font-size: 0.875rem; /* file:text-sm */
    font-weight: 600; /* file:font-semibold */
    background-color: #dbeafe; /* file:bg-blue-50 */
    color: #1d4ed8; /* file:text-blue-700 */
    cursor: pointer;

    &:hover {
      background-color: #bfdbfe; /* hover:file:bg-blue-100 */
    }
  }
`;

export const FileInputLabel = styled.label`
  display: block;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #374151; /* text-gray-700 */
  margin-bottom: 0.5rem; /* mb-2 */
`;

export const TechnologiesSubSection = styled.div`
  margin-bottom: 1rem; /* mb-4 */

  h4 {
    font-weight: 600; /* font-semibold */
    margin-bottom: 0.5rem; /* mb-2 */
  }
`;

export const URLInput = styled(FormInput)`
  grid-column: span 2; /* col-span-2 */
`;