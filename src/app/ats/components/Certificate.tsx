import React from 'react';
import {
  CertificateContainer,
  CertificateTitle,
  CertificateList,
  CertificateItem,
  CertificateName,
  CertificateInfo
} from './Certificate.styled';

interface CertificateProps {
  data: {
    name: string;
    institute: string;
    credential?: string;
    issued: string;
    url?: string;
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

const Certificate: React.FC<CertificateProps> = ({ data, lang }) => {
  const sortedData = [...data].sort((a, b) => new Date(b.issued).getTime() - new Date(a.issued).getTime());

  return (
    <CertificateContainer>
      <CertificateTitle>
        {lang === 'it' ? 'CERTIFICAZIONI' : lang === 'pt' ? 'CERTIFICADOS' : 'CERTIFICATIONS'}
      </CertificateTitle>
      
      <CertificateList>
        {sortedData.map((item, index) => (
          <CertificateItem key={index}>
            <CertificateName>
              {item.name}
            </CertificateName>
            <CertificateInfo>
              {item.institute} | {convertDate(item.issued)}
              {item.credential && ` | ${item.credential}`}
            </CertificateInfo>
            {item.url && (
              <CertificateInfo>
                URL: {item.url}
              </CertificateInfo>
            )}
          </CertificateItem>
        ))}
      </CertificateList>
    </CertificateContainer>
  );
};

export default Certificate;