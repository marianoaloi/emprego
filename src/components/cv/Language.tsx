import React from 'react';
import {
  LanguageContainer,
  LanguageList,
  LanguageItem,
  LanguageName,
  ProgressContainer,
  ProgressBar,
  ProgressFill
} from './Language.styled';

interface LanguageItem {
  name: string;
  value: number;
}
interface LanguagesProps {
  lang:string;
}

const Languages: React.FC<LanguagesProps> = ({lang}) => {
  const data: LanguageItem[] = [
    {
      "name": (lang === "it" ? "Portuguese" : "Portuguese"),
      "value": 100
    },
    {
      "name": (lang === "it" ? "Inglese" : "English"),
      "value": 80
    },
    {
      "name": (lang === "it" ? "Italiano" : "Italian"),
      "value": 70
    }
  ]
  return (
    <LanguageContainer>
      <LanguageList>
        {data.map((item, index) => (
          <LanguageItem key={index}>
            <LanguageName>{item.name}</LanguageName>
            <ProgressContainer>
              <ProgressBar>
                <ProgressFill width={item.value} />
              </ProgressBar>
            </ProgressContainer>
          </LanguageItem>
        ))}
      </LanguageList>
    </LanguageContainer>
  );
};

export default Languages;
