
import React from 'react';
import {
  EducationContainer,
  EducationItem,
  EducationDegree,
  EducationInfo
} from './Education.styled';
import { convertDate } from '@/components/util/componentDate';

interface EducationProps {
  data: {
    degree: string;
    school: string;
    start: string;
    end: string;
  }[];
}

const Education: React.FC<EducationProps> = ({ data }) => {

  data.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

  return (
    <EducationContainer>
      {data.map((item, index) => (
        <EducationItem key={index}>
          <EducationDegree>{item.degree}</EducationDegree>
          <EducationInfo>{item.school} | {convertDate(item.start)} - {convertDate(item.end)}</EducationInfo>
        </EducationItem>
      ))}
    </EducationContainer>
  );
};

export default Education;
