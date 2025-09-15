import React from 'react';
import {
  LanguageContainer,
  LanguageTitle,
  LanguageItem
} from './Language.styled';
import { SkillItem, SkillLevel, SkillName, SkillsList } from './Skills.styled';

interface LanguageItem {
  name: string;
  value: number;
}

interface LanguagesProps {
  lang: string;
}

const Languages: React.FC<LanguagesProps> = ({ lang }) => {
  const data: LanguageItem[] = [
    {
      name: (lang === "it" ? "Portoghese" : "Portuguese"),
      value: 100
    },
    {
      name: (lang === "it" ? "Inglese" : "English"),
      value: 80
    },
    {
      name: (lang === "it" ? "Italiano" : "Italian"),
      value: 70
    }
  ];

  const getLanguageLevelText = (level: number): string => {
    if (level >= 95) return lang === 'it' ? 'Madrelingua' : 'Native';
    if (level >= 85) return lang === 'it' ? 'Fluente' : 'Fluent';
    if (level >= 70) return lang === 'it' ? 'Avanzato' : 'Advanced';
    if (level >= 50) return lang === 'it' ? 'Intermedio' : 'Intermediate';
    return lang === 'it' ? 'Base' : 'Basic';
  };

  return (
    <LanguageContainer>
      <LanguageTitle>
        {lang === "it" ? "LINGUE" : "LANGUAGES"}
      </LanguageTitle>
      <SkillsList>
        {data.map((item, index) => (
          <SkillItem key={index}>
            <SkillName>{item.name}</SkillName>
            <SkillLevel>{getLanguageLevelText(item.value)}</SkillLevel>
          </SkillItem>
        ))}
      </SkillsList>
    </LanguageContainer>
  );
};

export default Languages;