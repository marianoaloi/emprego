import { LinkControl, LinkCv } from "@/app/ats/page.styled";



export const LinkInCurriculum = () => {
  return (
    
        <LinkControl>
          <LinkCv onClick={() => window.open('/cv','_blank')}>CV</LinkCv>
          <LinkCv onClick={() => window.open('/ats','_blank')}>ATS</LinkCv>
          <LinkCv onClick={() => window.open('/cv/load','_blank')}>LOAD</LinkCv>
        </LinkControl>
  );
};