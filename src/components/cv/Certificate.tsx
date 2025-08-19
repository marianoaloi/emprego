import { convertDate } from "../util/componentDate";


interface CertificateProps {
 data: {
    name: string;
    institute: string;
    credential: string;
    issued: string;
    url: string;
  }[];
  lang:string;
}

const Certificate: React.FC<CertificateProps> = ({ data, lang }) => {
  data.sort((a, b) => new Date(b.issued).getTime() - new Date(a.issued).getTime());

 return (
    <div className="mb-8">
        <h2 className="text-2xl font-bold border-b-2 border-gray-400 pb-2 mb-4">{lang === 'it' ? 'Certificazioni' : 'Certificates'}</h2>
      
      <div className="flex flex-wrap gap-4">
        {data.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded-md p-3 bg-white shadow-sm flex-shrink-0">
            <h3 className="text-xl font-bold">{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a> : item.name}</h3>
            <p className="text-xs font-semibold">{item.institute} | {convertDate(item.issued)} </p>
          </div>
        ))}
      </div>
    </div>
  );
};
        
export default Certificate;