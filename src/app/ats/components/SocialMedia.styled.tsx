import styled from '@emotion/styled';

export const SocialMediaContainer = styled.div`
  margin-bottom: 0.25rem;
`;

export const SocialMediaTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  color: #1f2937;
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 0.25rem;
`;

export const SocialMediaGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

export const SocialHidden = styled.a(
  {
    color: 'lightgray',
    // fontSize: '1px'
  }
)

export const SocialMediaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: inherit;
  transition: color 0.2s;
  
  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

export const SocialMediaIcon = styled.span``;

export const SocialMediaLink = styled.a`
  color: #2563eb;
  text-decoration: underline;
  
  &:hover {
    color: #1d4ed8;
  }
`;