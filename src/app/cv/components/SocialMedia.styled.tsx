import styled from '@emotion/styled';

export const SocialMediaContainer = styled.div`
  margin-bottom: 2rem;
`;

export const SocialMediaTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 2px solid #9ca3af;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

export const SocialMediaGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

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