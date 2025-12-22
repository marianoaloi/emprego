
import React from 'react';
import {
  ExperienceContainer,
  ExperienceTitle,
  ExperienceItem,
  JobTitle,
  CompanyInfo,
  Duration,
  JobDescription,
  TechnologiesContainer,
  TechnologyTag
} from './Experience.styled';
import { calculateDateDifference, convertDate } from '@/components/util/componentDate';
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

const Experience: React.FC<ExperienceProps> = ({ data, lang }) => {
  data.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

  return (
    <ExperienceContainer>
      <ExperienceTitle>{lang === 'it' ? 'Esperienza Professionale' : lang === 'pt' ? 'Experiência Profissional' : 'Professional Experience'}</ExperienceTitle>
      {data.map((item, index) => (
        <ExperienceItem key={index}>
          <JobTitle>{item.title}</JobTitle>
          <CompanyInfo>{item.company} | {convertDate(item.start)} - {item.end ? convertDate(item.end) : lang === 'it' ? 'Presente' : lang === 'pt' ? 'Presente' : 'Present'} <Duration>({calculateDateDifference(item.start, item.end, lang)})</Duration></CompanyInfo>
          <JobDescription dangerouslySetInnerHTML={{ __html: identParagraph(item.description) }} />
          <TechnologiesContainer>
            {
              item.technologies
                .sort((a, b) => a.localeCompare(b))
                .map((tech, index) =>
                  <TechnologyTag key={index}>
                    {tech}
                  </TechnologyTag>
                )
            }
          </TechnologiesContainer>
        </ExperienceItem>
      ))}
    </ExperienceContainer>
  );
};

export default Experience;
