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
      name: (lang === "it" ? "Portoghese" : lang === "pt" ? "Português" : "Portuguese"),
      value: 100
    },
    {
      name: (lang === "it" ? "Inglese" : lang === "pt" ? "Inglês" : "English"),
      value: 80
    },
    {
      name: (lang === "it" ? "Italiano" : lang === "pt" ? "Italiano" : "Italian"),
      value: 70
    }
  ];

  const getLanguageLevelText = (level: number): string => {
    if (level >= 95) return lang === 'it' ? 'Madrelingua' : lang === 'pt' ? 'Língua Materna' : 'Native';
    if (level >= 85) return lang === 'it' ? 'Fluente' : lang === 'pt' ? 'Fluente' : 'Fluent';
    if (level >= 70) return lang === 'it' ? 'Avanzato' : lang === 'pt' ? 'Avançado' : 'Advanced';
    if (level >= 50) return lang === 'it' ? 'Intermedio' : lang === 'pt' ?  'Intermediário' :'Intermediate';
    return lang === 'it' ? 'Base' : lang === 'pt' ? 'Básico' : 'Basic';
  };

  return (
    <LanguageContainer>
      <LanguageTitle>
        {lang === "it" ? "LINGUE" : lang === "pt" ? "LINGUAGENS" : "LANGUAGES"}
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