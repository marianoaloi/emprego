import { convertDate } from '@/components/util/componentDate';
import {
  CertificateContainer,
  CertificateTitle,
  CertificateGrid,
  CertificateCard,
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
  lang:string;
}

const Certificate: React.FC<CertificateProps> = ({ data, lang }) => {
  data.sort((a, b) => new Date(b.issued).getTime() - new Date(a.issued).getTime());

 return (
    <CertificateContainer>
        <CertificateTitle>{lang === 'it' ? 'Certificazioni' : 'Certificates'}</CertificateTitle>
      
      <CertificateGrid>
        {data.map((item, index) => (
          <CertificateCard key={index}>
            <CertificateName>{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a> : item.name}</CertificateName>
            <CertificateInfo>{item.institute} | {convertDate(item.issued)} </CertificateInfo>
          </CertificateCard>
        ))}
      </CertificateGrid>
    </CertificateContainer>
  );
};
        
export default Certificate;