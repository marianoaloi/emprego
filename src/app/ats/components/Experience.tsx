import React from 'react';
import {
  ExperienceContainer,
  ExperienceTitle,
  ExperienceItem,
  JobTitle,
  CompanyInfo,
  Duration,
  JobDescription,
  TechnologiesList
} from './Experience.styled';
import { identParagraph } from '@/components/util/componentString';

interface ExperienceProps {
  data: {
    title: string;
    company: string;
    end: string;
    start: string;
    description: string;
    technologies: string[];
  }[];
  lang: string;
}

const convertDate = (sysDate: string): string => {
  const dateUse = sysDate ? new Date(sysDate) : new Date();
  return dateUse.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
  });
};

const calculateDateDifference = (startDate: string, endDate: string, languageCode: string): string => {
  const start = new Date(startDate.substring(0, 8) + '01');
  const end = endDate ? new Date(endDate.substring(0, 8) + '01') : new Date();
  
  const yearDiff = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();
  const totalMonths = yearDiff * 12 + monthDiff;
  
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  const translations = {
    'it': { year: 'anno', years: 'anni', month: 'mese', months: 'mesi', and: 'e' },
    'en': { year: 'year', years: 'years', month: 'month', months: 'months', and: 'and' }
  };
  
  const lang = translations[languageCode as keyof typeof translations] || translations.en;
  
  const parts: string[] = [];
  
  if (years > 0) {
    const yearText = years === 1 ? lang.year : lang.years;
    parts.push(`${years} ${yearText}`);
  }
  
  if (months > 0) {
    const monthText = months === 1 ? lang.month : lang.months;
    parts.push(`${months} ${monthText}`);
  }
  
  if (parts.length === 0) {
    return `0 ${lang.months}`;
  }
  
  return parts.join(` ${lang.and} `);
};

const Experience: React.FC<ExperienceProps> = ({ data, lang }) => {
  const sortedData = [...data].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

  const formatDescription = (text: string) => {
    return text.replace(/<[^>]*>/g, '').trim();
  };

  return (
    <ExperienceContainer>
      <ExperienceTitle>
        {lang === 'it' ? 'ESPERIENZA PROFESSIONALE' : lang === 'pt' ? 'EXPERIÊNCIA PROFISSIONAL' : 'PROFESSIONAL EXPERIENCE'}
      </ExperienceTitle>
      {sortedData.map((item, index) => (
        <ExperienceItem key={index}>
          <JobTitle>{item.title}</JobTitle>
          <CompanyInfo>
            {item.company}
          </CompanyInfo>
          <Duration>
            {lang === 'it' ? 'Inizio' : lang === 'pt' ? 'Início' : 'Start'}:{convertDate(item.start)} &nbsp;
            {lang === 'it' ? 'Fine' : lang === 'pt' ? 'Fim' : 'End'}:{item.end ? convertDate(item.end) : (lang === 'it' ? 'Presente' : lang === 'pt' ? 'Presente' : 'Present')}  &nbsp;
            {lang === 'it' ? 'Durata' : lang === 'pt' ? 'Duração' : 'Duration'}:{calculateDateDifference(item.start, item.end, lang)}
          </Duration>
          <JobDescription dangerouslySetInnerHTML={{ __html: identParagraph(item.description) }}/>
          <TechnologiesList>
            <strong>Technologies:</strong> {item.technologies.sort((a, b) => a.localeCompare(b)).join(', ')}
          </TechnologiesList>
        </ExperienceItem>
      ))}
    </ExperienceContainer>
  );
};

export default Experience;