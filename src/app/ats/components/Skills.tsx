import React from 'react';
import {
  SkillsContainer,
  SkillsTitle,
  SkillsList,
  SkillItem,
  SkillName,
  SkillLevel
} from './Skills.styled';

interface SkillItem {
  skillName: string;
  skillLevel: number;
}

interface SkillsProps {
  data: SkillItem[];
  lang: string;
}

const Skills: React.FC<SkillsProps> = ({ data,lang }) => {
  const sortedData = [...data]
    .sort((a, b) => a.skillName.localeCompare(b.skillName))
    .sort((a, b) => b.skillLevel - a.skillLevel);

  const getSkillLevelText = (level: number): string => {
    if (level >= 90) return lang === 'it' ? 'Esperto' : lang === 'pt' ? 'Experiente' : 'Expert';
    if (level >= 75) return lang === 'it' ? 'Avanzato' : lang === 'pt' ? 'Avançado' : 'Advanced';
    if (level >= 60) return lang === 'it' ? 'Intermedio' : lang === 'pt' ? 'Intermediário':'Intermediate';
    if (level >= 40) return lang === 'it' ? 'Base' : lang === 'pt' ? 'Básico' : 'Basic';
    return lang === 'it' ? 'Principiante' : lang === 'pt' ? 'Iniciante' : 'Beginner';
  };

  return (
    <SkillsContainer>
      <SkillsTitle>TECHNICAL SKILLS</SkillsTitle>
      <SkillsList>
        {sortedData.map((item, index) => (
          <SkillItem key={index}>
            <SkillName>{item.skillName}</SkillName>
            <SkillLevel>{getSkillLevelText(item.skillLevel)}</SkillLevel>
          </SkillItem>
        ))}
      </SkillsList>
    </SkillsContainer>
  );
};

export default Skills;