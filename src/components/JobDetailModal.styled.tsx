import styled from '@emotion/styled';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Chip, IconButton } from '@mui/material';

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    max-width: 800px;
    max-height: 90vh;
    margin: 1rem;
    border-radius: 12px;
  }
`;

export const LogoAzienda = styled.img((props:{size: number}) => `
  width: ${props.size}px;
  height: ${props.size}px;
  border-radius: 50%;
  object-fit: cover;
`);

interface JobCardProps {
  appliedbyme?: string;
  ignore?: string;
  wait?: string;
  close?: string;
}

export const StyledDialogTitle = styled(DialogTitle)<JobCardProps>`
  && {
    background: ${({ appliedbyme, ignore, wait , close }) => {
      
      if (appliedbyme) return 'linear-gradient(135deg, #1f8a1e 0%, #3bf64c 100%)'; // Light green
      if (ignore) return 'linear-gradient(135deg, #8a1e1e 0%, #f63b48 100%)'; // Light red
      if (wait) return 'linear-gradient(135deg, #8a811e 0%, #f2f63b 100%)'; // Light yellow
      if (close) return 'linear-gradient(135deg, #000000 0%, #afafad 100%)'; // Light gray
      return 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'; // Default white background
    }};
    color: white;
    padding: 1.5rem 2rem;
    position: relative;
    
    .MuiTypography-root {
      font-size: 1.25rem;
      font-weight: 600;
      padding-right: 3rem;
    }
  }
`;

export const CloseButton = styled(IconButton)`
  && {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const StyledDialogContent = styled(DialogContent)`
  && {
    padding: 0;
    overflow: auto;
  }
`;

export const CompanyHeader = styled(Box)`
  background-color: #1e3a8a;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .company-name {
    font-size: 1.125rem;
    font-weight: 600;
  }
  
  .job-id {
    font-size: 0.875rem;
    opacity: 0.8;
  }
`;

export const ContentSection = styled(Box)`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
`;

export const JobDetailsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const DetailItem = styled(Box)`
  .label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    margin-bottom: 0.25rem;
  }
  
  .value {
    font-size: 0.875rem;
    color: #374151;
    font-weight: 500;
  }
`;

export const StatusChip = styled(Chip)<{ status: 'applied' | 'ignored' | 'waiting' | 'closed' }>`
  && {
    font-weight: 600;
    color: white;
    background-color: ${({ status }) => {
      switch (status) {
        case 'applied': return '#059669';
        case 'ignored': return '#dc2626';
        case 'waiting': return '#d97706';
        case 'closed': return '#6b7280';
        default: return '#6b7280';
      }
    }};
  }
`;

export const LLMContent = styled(Box)`
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  
  .llm-content {
    font-size: 0.875rem;
    line-height: 1.6;
    color: #374151;
    
    h1, h2, h3, h4, h5, h6 {
      margin: 1rem 0 0.5rem 0;
      font-weight: 600;
      color: #1f2937;
    }
    
    h1 { font-size: 1.5rem; }
    h2 { font-size: 1.25rem; }
    h3 { font-size: 1.125rem; }
    
    p {
      margin: 0.75rem 0;
    }
    
    ul, ol {
      margin: 0.75rem 0;
      padding-left: 1.5rem;
    }
    
    li {
      margin: 0.25rem 0;
    }
    
    strong {
      font-weight: 600;
      color: #1f2937;
    }
    
    em {
      font-style: italic;
    }
    
    a {
      color: #2563eb;
      text-decoration: underline;
      
      &:hover {
        color: #1d4ed8;
      }
    }
    
    code {
      background-color: #e5e7eb;
      padding: 0.125rem 0.25rem;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.8em;
    }
    
    pre {
      background-color: #e5e7eb;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
      margin: 1rem 0;
      
      code {
        background: none;
        padding: 0;
      }
    }
  }
`;

export const StyledDialogActions = styled(DialogActions)`
  && {
    padding: 1.5rem 2rem;
    background-color: #f9fafb;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const ActionButtonsGroup = styled(Box)`
  display: flex;
  gap: 0.75rem;
  
  .MuiIconButton-root {
    padding: 12px;
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &.special-action {
      color: #0008ff;
      background-color: rgba(5, 7, 255, 0.1);
      &:hover { background-color: rgba(5, 7, 255, 0.2); }
    }
    
    &.go-action {
      color: #059669;
      background-color: rgba(5, 150, 105, 0.1);
      &:hover { background-color: rgba(5, 150, 105, 0.2); }
    }
    
    &.reject-action {
      color: #dc2626;
      background-color: rgba(220, 38, 38, 0.1);
      &:hover { background-color: rgba(220, 38, 38, 0.2); }
    }
    
    &.wait-action {
      color: #d97706;
      background-color: rgba(217, 119, 6, 0.1);
      &:hover { background-color: rgba(217, 119, 6, 0.2); }
    }
    
    &.accept-action {
      color: #059669;
      background-color: rgba(5, 150, 105, 0.1);
      &:hover { background-color: rgba(5, 150, 105, 0.2); }
    }
    
    &.lock-action {
      color: #6b7280;
      background-color: rgba(107, 114, 128, 0.1);
      &:hover { background-color: rgba(107, 114, 128, 0.2); }
    }
  }
`;