import styled from '@emotion/styled';

export const PreFilterButton = styled.button`
  background-color: #1d4ed8; /* bg-blue-700 */
  padding: 0.5rem 1rem; /* px-4 py-2 */
  border-radius: 0.375rem; /* rounded-md */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px; /* Ensure icon button has adequate size */

  &:hover {
    background-color: #1e40af; /* hover:bg-blue-800 */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;
