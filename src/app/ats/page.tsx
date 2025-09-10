"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import PersonalInfo from "./components/PersonalInfo";
import Summary from "./components/Summary";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Languages from "./components/Language";
import Certificate from "./components/Certificate";
import {
  ATSPageContainer,
  ATSContainer,
  ATSContent,
  LoadingContainer,
  LoadingText,
  ATSSection,
  JumpLine,
  LinkControl,
  LinkCv
} from "./page.styled";
import SocialMedia from "./components/SocialMedia";
import { ActionButton, JumpLineControl, JumpLineInput, JumpLineLabel } from "../cv/page.styled";
import CVData from "../../components/util/CVData";


export default function ATSPage() {
  const atsRef = useRef<HTMLDivElement>(null);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [opportunityId, setOpportunityId] = useState<string>("");
  const [language, setLanguage] = useState<string>("en");

  const [jumpLineCount, setJumpLineCount] = useState<number>(0);
  const [jumpSocialCount, setJumpSocialCount] = useState<number>(0);
  const [jumpSkillCount, setJumpSkillCount] = useState<number>(0);

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
      return;
    }

    const lang = localStorage.getItem("lang");
    if (lang) {
      setLanguage(lang);
    }
    const data = localStorage.getItem("cvData");
    if (data) {
      const dataj = JSON.parse(data);
      dataj.languageCodeOfJobDescription = dataj.languageCodeOfJobDescription || lang;

      setCvData(dataj);
    }

    const oppId = localStorage.getItem("opportunityId");
    if (oppId) {
      setOpportunityId(oppId);
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (cvData) {
      changeTitle(opportunityId, cvData);
    }
  }, [cvData, opportunityId]);



  const handleJumpLineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setJumpLineCount(0);
      return;
    }

    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0 && num <= 20) {
      setJumpLineCount(num);
    }
  };



  const handleJumpSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setJumpSocialCount(0);
      return;
    }

    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0 && num <= 20) {
      setJumpSocialCount(num);
    }
  };

  const handleJumpSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setJumpSkillCount(0);
      return;
    }

    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0 && num <= 20) {
      setJumpSkillCount(num);
    }
  };



  if (authLoading) {
    return (
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  if (!user) {
    return (
      <LoadingContainer>
        <LoadingText>Redirecting to login...</LoadingText>
      </LoadingContainer>
    );
  }

  const handleExport = () => {
    if (atsRef.current && cvData) {
      changeTitle(opportunityId, cvData);
      const style = Array
        .from(document.querySelectorAll('style'))
        .map(x => `<style>${x.innerHTML}</style>`)
        .join('');
      const tailcss = `<style>@layer theme {  :root, :host {    --spacing: .25rem;    } } .indent-5 {text-indent: calc(var(--spacing) * 5);} .text-justify {text-align: justify;}</style>`;
      const htmlCenter = atsRef.current.innerHTML;
      const fixHTML = `<html><head>  <meta charset="UTF-8" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />${style}${tailcss}</head><body>${htmlCenter}</body></html>`;
      const blob = new Blob([fixHTML], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const filename = `${defineTitle(opportunityId, cvData)}_ATS.html`;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handlePrint = () => {
    const atsElement = document.getElementById("ats");
    if (atsElement && cvData) {
      const originalContents = document.body.innerHTML;
      const printContents = atsElement.innerHTML;
      document.body.innerHTML = printContents;
      changeTitle(opportunityId, cvData);
      window.print();
      document.body.innerHTML = originalContents;
    }
  };


  return (
    <ATSPageContainer>
      <JumpLineControl>
        <JumpLineLabel htmlFor="jumpSocialInput">Jump Social (0-20):</JumpLineLabel>
        <JumpLineInput
          id="jumpSocialInput"
          type="number"
          min="0"
          max="20"
          value={jumpSocialCount}
          onChange={handleJumpSourceChange}
          placeholder="0"
        />
        <JumpLineLabel htmlFor="jumpSkillInput">Jump Skills (0-20):</JumpLineLabel>
        <JumpLineInput
          id="jumpSkillInput"
          type="number"
          min="0"
          max="20"
          value={jumpSkillCount}
          onChange={handleJumpSkillChange}
          placeholder="0"
        />
        <JumpLineLabel htmlFor="jumpLineInput">Jump Lines (0-20):</JumpLineLabel>
        <JumpLineInput
          id="jumpLineInput"
          type="number"
          min="0"
          max="20"
          value={jumpLineCount}
          onChange={handleJumpLineChange}
          placeholder="0"
        />

        <ActionButton
          variant="green"
          onClick={handlePrint}
        >
          Print CV
        </ActionButton>

        <ActionButton
          variant="indigo"
          onClick={handleExport}
        >
          Export as HTML
        </ActionButton>
        <div>
          {cvData && defineTitle(opportunityId, cvData)}
        </div>
        <LinkInCurriculum/>
      </JumpLineControl>

      <ATSContainer id="ats" ref={atsRef}>
        {cvData ? (
          <ATSContent>
            <ATSSection>
              <PersonalInfo lang={cvData.languageCodeOfJobDescription} />
            </ATSSection>

            <ATSSection>
              <Summary data={cvData.summary} lang={cvData.languageCodeOfJobDescription} />
            </ATSSection>

            <JumpLine dangerouslySetInnerHTML={{ __html: '<br/>'.repeat(jumpSocialCount) }} />
            <ATSSection>
              <SocialMedia />
            </ATSSection>

            <JumpLine dangerouslySetInnerHTML={{ __html: '<br/>'.repeat(jumpSkillCount) }} />
            <ATSSection>
              <Skills data={cvData.relevantSkills} lang={cvData.languageCodeOfJobDescription} />
            </ATSSection>
            <JumpLine dangerouslySetInnerHTML={{ __html: '<br/>'.repeat(jumpLineCount) }} />

            <ATSSection>
              <Experience data={cvData.experience} lang={cvData.languageCodeOfJobDescription} />
            </ATSSection>

            <ATSSection>
              <Education data={cvData.educations} lang={cvData.languageCodeOfJobDescription} />
            </ATSSection>

            <ATSSection>
              <Languages lang={cvData.languageCodeOfJobDescription} />
            </ATSSection>

            <ATSSection>
              <Certificate data={cvData.certificates} lang={cvData.languageCodeOfJobDescription} />
            </ATSSection>
          </ATSContent>
        ) : (
          <p>Loading CV data...</p>
        )}
      </ATSContainer>
    </ATSPageContainer>
  );
}

function changeTitle(opportunityId?: string, cvData?: CVData) {
  const title = defineTitle(opportunityId, cvData) + "-ATS_Format";
  document.title = title;
  return title;
}

function defineTitle(opportunityId?: string, cvData?: CVData) {
  return opportunityId
    ? `Mariano_Aloi_${opportunityId}_${cvData?.languageCodeOfJobDescription}`
    : `Mariano_Aloi_${cvData?.languageCodeOfJobDescription}`;
}

export const LinkInCurriculum = () => {
  return (
    
        <LinkControl>
          <LinkCv onClick={() => window.open('/cv','_blank')}>CV</LinkCv>
          <LinkCv onClick={() => window.open('/ats','_blank')}>ATS</LinkCv>
          <LinkCv onClick={() => window.open('/cv/load','_blank')}>LOAD</LinkCv>
        </LinkControl>
  );
};