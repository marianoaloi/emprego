import styled from '@emotion/styled';

export const JobDescriptionContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
  max-height: 500px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: #6b7280;
`;

export const ErrorContainer = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fca5a5;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
`;

export const FormattedContent = styled.div`
  line-height: 1.6;
  color: #374151;
  font-size: 0.95rem;
  
  /* Emoji and Unicode support */
  font-variant-emoji: unicode;
  text-rendering: optimizeLegibility;
  
  /* Bold text styling */
  .bold {
    font-weight: 600;
    color: #1f2937;
  }
  
  /* Italic text styling */
  .italic {
    font-style: italic;
    color: #4b5563;
  }
  
  /* List styling */
  .list {
    margin: 1rem 0;
    padding-left: 0;
  }
  
  .list.ordered {
    counter-reset: list-counter;
  }
  
  /* List item styling */
  .list-item {
    display: flex;
    align-items: flex-start;
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
  }
  
  .list.ordered .list-item::before {
    counter-increment: list-counter;
    content: counter(list-counter) ". ";
    position: absolute;
    left: 0;
    font-weight: 500;
    color: #6b7280;
  }
  
  .list:not(.ordered) .list-item::before {
    content: "• ";
    position: absolute;
    left: 0;
    font-weight: bold;
    color: #2563eb;
  }
  
  /* Line break styling */
  .line-break {
    display: block;
    height: 0.5rem;
  }
  
  /* Paragraph styling */
  p {
    margin: 0.75rem 0;
  }
  
  /* Heading-like bold text at start of lines */
  .bold:first-child {
    font-size: 1.1rem;
    color: #1f2937;
    margin-bottom: 0.5rem;
    display: block;
  }
`;

export const RetryButton = styled.button`
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #1d4ed8;
  }
  
  &:focus {
    outline: 2px solid #93c5fd;
    outline-offset: 2px;
  }
`;