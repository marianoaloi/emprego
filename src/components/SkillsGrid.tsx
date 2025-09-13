'use client';

import React from 'react';
import { Box, Chip, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '@/lib/hooks';

const SkillsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const SkillsFlow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  alignItems: 'flex-start',
}));

const SkillChip = styled(Chip)<{ skillonprofile?: string }>(({ theme, skillonprofile }) => ({
  borderRadius: theme.spacing(3),
  height: 'auto',
  padding: theme.spacing(0.5, 1),
  fontSize: '0.875rem',
  fontWeight: 500,
  backgroundColor: skillonprofile ? '#e8f5e8' : '#f3f4f6',
  color: skillonprofile ? '#2d7d2d' : '#374151',
  border: skillonprofile ? '1px solid #4ade80' : '1px solid #d1d5db',
  '&:hover': {
    backgroundColor: skillonprofile ? '#dcf2dc' : '#e5e7eb',
  },
  '& .MuiChip-label': {
    padding: theme.spacing(0.5, 1),
  },
}));

const LinkSkillChip = styled(SkillChip)(() => ({
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
    color: '#1d4ed8',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#111827',
  marginBottom: theme.spacing(1),
}));



export default function SkillsGrid() {
  const { skills, loading, error } = useAppSelector((state) => state.skills);


  if (loading) {
    return (
      <SkillsContainer>
        <SectionTitle>Required Skills</SectionTitle>
        <Box display="flex" justifyContent="center" alignItems="center" py={2}>
          <CircularProgress size={24} />
          <Typography variant="body2" sx={{ ml: 1, color: '#6b7280' }}>
            Loading skills...
          </Typography>
        </Box>
      </SkillsContainer>
    );
  }

  if (error) {
    return (
      <SkillsContainer>
        <SectionTitle>Required Skills</SectionTitle>
        <Typography variant="body2" color="error">
          Failed to load skills: {error}
        </Typography>
      </SkillsContainer>
    );
  }

  if (!skills || !skills.match || skills.match.length === 0) {
    return null; // Don't render anything if no skills
  }

  const handleSkillClick = (skill: any) => {
    if (skill.skillMatchActionButton) {
      window.open(skill.skillMatchActionButton, '_blank');
    }
  };

  return (
    <SkillsContainer>
      <SectionTitle>Required Skills {skills.match.filter(skill => skill.skillOnProfile).length}/{skills.match.length}({skills.match.length ? Math.round(skills.match.filter(skill => skill.skillOnProfile).length / skills.match.length * 100) : 0}%)</SectionTitle>
      <SkillsFlow>
        {skills.match.map((skill, index) => {
          const hasLink = Boolean(skill.skillMatchActionButton);
          
          if (hasLink) {
            return (
              <LinkSkillChip
                key={`${skill.localizedSkillDisplayName}-${index}`}
                label={skill.localizedSkillDisplayName}
                skillonprofile={skill.skillOnProfile?'true':undefined}
                onClick={() => handleSkillClick(skill)}
              />
            );
          }
          
          return (
            <SkillChip
              key={`${skill.localizedSkillDisplayName}-${index}`}
              label={skill.localizedSkillDisplayName}
              skillonprofile={skill.skillOnProfile?'true':undefined}
            />
          );
        })}
      </SkillsFlow>
      {skills.match.some(skill => skill.skillOnProfile) && (
        <Typography variant="caption" sx={{ color: '#6b7280', mt: 1 }}>
          Green skills are already on your profile
        </Typography>
      )}
    </SkillsContainer>
  );
}