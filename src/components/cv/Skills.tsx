import React from 'react';
import {
  SkillsContainer,
  SkillsList,
  SkillItem,
  SkillName,
  ProgressContainer,
  ProgressBar,
  ProgressFill
} from './Skills.styled';

interface SkillItem {
  skillName: string;
  skillLevel: number;
}
interface SkillsProps {
  data: SkillItem[];
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  data.sort((a, b) =>  a.skillName.localeCompare(b.skillName)  );
  data.sort((a, b) =>  b.skillLevel - a.skillLevel  );

  return (
    <SkillsContainer>
      <SkillsList>
        {data.map((item, index) => (
          <SkillItem key={index}>
            <SkillName>{item.skillName}</SkillName>
            <ProgressContainer>
              <ProgressBar>
                <ProgressFill width={item.skillLevel} />
              </ProgressBar>
            </ProgressContainer>
          </SkillItem>
        ))}
      </SkillsList>
    </SkillsContainer>
  );
};

export default Skills;
