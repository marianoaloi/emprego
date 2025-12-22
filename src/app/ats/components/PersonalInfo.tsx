import React from 'react';
import {
  PersonalInfoContainer,
  Name,
  ContactInfo,
  ContactItem
} from './PersonalInfo.styled';

interface PersonalInfoProps {
  lang:string
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ lang }) => {
  return (
    <PersonalInfoContainer>
      <Name> Mariano Aloi</Name>
      <ContactInfo>
        <ContactItem>Email: mariano@aloi.com.br</ContactItem>
        <ContactItem>{lang === 'it' ? 'Telefono' : lang === 'pt' ? 'Telefone' : 'Phone'}: +39 378 091 4635</ContactItem>
        
        <ContactItem>{lang === 'it' ? 'Indirizzo' : lang === 'pt' ? 'Endereço' : 'Address'}: Udine, Italy</ContactItem>
      </ContactInfo>
    </PersonalInfoContainer>
  );
};

export default PersonalInfo;