import React from 'react';
import {
  EducationContainer,
  EducationTitle,
  EducationItem,
  EducationDegree,
  EducationInfo
} from './Education.styled';

interface EducationProps {
  data: {
    degree: string;
    school: string;
    start: string;
    end: string;
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

const Education: React.FC<EducationProps> = ({ data, lang }) => {
  const sortedData = [...data].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

  return (
    <EducationContainer>
      <EducationTitle>
        {lang === "it" ? "EDUCAZIONE" : "EDUCATION"}
      </EducationTitle>
      {sortedData.map((item, index) => (
        <EducationItem key={index}>
          <EducationDegree>{item.degree}</EducationDegree>
          <EducationInfo>
            {item.school} | {convertDate(item.start)} - {convertDate(item.end)}
          </EducationInfo>
        </EducationItem>
      ))}
    </EducationContainer>
  );
};

export default Education;