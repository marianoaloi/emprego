"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import PersonalInfo from "./components/PersonalInfo";
import Summary from "./components/Summary";
import Skills from "./components/Skills";
import SocialMedia from "./components/SocialMedia";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Languages from "./components/Language";
import Certificate from "./components/Certificate";
import {
  CVPageContainer,
  CVContainer,
  CVContent,
  EducationSection,
  EducationTitle,
  EducationGrid,
  ActionButton,
  LoadingContainer,
  LoadingText,
  JumpLine,
  JumpLineControl,
  JumpLineInput,
  JumpLineLabel
} from "./page.styled";
import CVData from "../../components/util/CVData";


export default function CVPage() {
  const cvRef = useRef<HTMLDivElement>(null);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [opportunityId, setOpportunityId] = useState<string>("");
  const [jumpLineCount, setJumpLineCount] = useState<number>(0);
  const [jumpSocialCount, setJumpSocialCount] = useState<number>(0);

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
      return;
    }

    const data = localStorage.getItem("cvData");
    if (data) {
      setCvData(JSON.parse(data));
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
    if (cvRef.current && cvData) {
      changeTitle(opportunityId, cvData);
      const style = Array
        .from(document.querySelectorAll('style'))
        .map(x => `<style>${x.innerHTML}</style>`)
        .join('');
      const tailcss = `<style>@layer theme {  :root, :host {    --spacing: .25rem;    } } .indent-5 {text-indent: calc(var(--spacing) * 5);} .text-justify {text-align: justify;}</style>`;
      const htmlCenter = cvRef.current.innerHTML;
      const fixHTML = `<html><head>  <meta charset="UTF-8" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />${style}${tailcss}</head><body>${htmlCenter}</body></html>`;
      const blob = new Blob([fixHTML], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const filename = `${defineTitle(opportunityId, cvData)}.html`;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handlePrint = () => {
    const cvElement = document.getElementById("cv");
    if (cvElement && cvData) {
      const originalContents = document.body.innerHTML;
      const printContents = cvElement.innerHTML;
      document.body.innerHTML = printContents;
      changeTitle(opportunityId, cvData);
      window.print();
      document.body.innerHTML = originalContents;
    }
  };

  return (
    <CVPageContainer>
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
      </JumpLineControl>
      <CVContainer id="cv" ref={cvRef}>
        {cvData ? (
          <>
            <PersonalInfo />
            <div>
              <CVContent>
                <div>
                  <Summary data={cvData.summary} lang={cvData.languageCodeOfJobDescription} />
                </div>
                <div>
                  <Skills data={cvData.relevantSkills} />
                </div>
              </CVContent>
            </div>
            <JumpLine dangerouslySetInnerHTML={{ __html: '<br/>'.repeat(jumpSocialCount) }} />
            <SocialMedia />
            <JumpLine dangerouslySetInnerHTML={{ __html: '<br/>'.repeat(jumpLineCount) }} />
            <Experience data={cvData.experience} lang={cvData.languageCodeOfJobDescription} />
            <EducationSection>
              <EducationTitle>{cvData.languageCodeOfJobDescription === "it" ? "Educazione" : "Education"}</EducationTitle>
              <EducationGrid>
                <div>
                  <Education data={cvData.educations} />
                </div>
                <div>
                  <Languages lang={cvData.languageCodeOfJobDescription} />
                </div>
              </EducationGrid>
            </EducationSection>
            <Certificate data={cvData.certificates} lang={cvData.languageCodeOfJobDescription} />
          </>
        ) : (
          <p>Loading CV data...</p>
        )}
      </CVContainer>
    </CVPageContainer>
  );
}

function changeTitle(opportunityId?: string, cvData?: CVData) {
  const title = defineTitle(opportunityId, cvData);
  document.title = title;
}
function defineTitle(opportunityId?: string , cvData?: CVData ) {
  return opportunityId
    ? `Mariano_Aloi_${opportunityId}_${cvData?.languageCodeOfJobDescription}`
    : `Mariano_Aloi_${cvData?.languageCodeOfJobDescription}`
}

