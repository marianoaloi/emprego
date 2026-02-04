import React from 'react';
import {
  PersonalInfoContainer,
  Name,
  ContactInfo,
  ContactItem,
  EmailLink
} from './PersonalInfo.styled';

const PersonalInfo: React.FC<{invalitita: boolean}>= ({invalitita}) => {
  return (
    <PersonalInfoContainer>
      <Name>Mariano Aloi{invalitita && ' ♿️'}</Name>
      <ContactInfo>
        <ContactItem>Technical Leader</ContactItem>
        <ContactItem>📍 Udine</ContactItem>
        <ContactItem>☎️ +39 378 091 4635</ContactItem>
        {invalitita && <ContactItem>Invalita Civile ♿️</ContactItem>}
        <EmailLink href='mailto:mariano@aloi.adv.br'>📬 mariano@aloi.adv.br</EmailLink>
      </ContactInfo>
    </PersonalInfoContainer>
  );
};

export default PersonalInfo;
