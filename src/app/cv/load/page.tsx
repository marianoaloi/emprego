
'use client';

import { useState } from 'react';
import CVData from '@/components/util/CVData';
import { Tooltip, IconButton } from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  ContentPaste as ContentPasteIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { LinkInCurriculum } from '@/components/util/linkCV';
import Editor from 'react-simple-wysiwyg';
import {
  CVLoadPageContainer,
  PageTitle,
  CVForm,
  Section,
  SectionTitle,
  EditorContainer,
  SkillRow,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
  SmallButton,
  ExperienceCard,
  GridContainer,
  TechnologyRow,
  TechnologyInput,
  SectionHeader,
  IconButtonGroup,
  StyledIconButton,
  FileInputContainer,
  FileInput,
  FileInputLabel,
  TechnologiesSubSection,
  URLInput
} from './page.styled';
import { JumpLineControl } from '../page.styled';



export default function CVLoadPage() {


  const saveResume = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cv_data_${opportunityId ? opportunityId : new Date().getTime()}.resume.json`;
    link.click();
  }

  const saveResumeToOriginalLocation = () => {
    if (!loadedFileName) {
      saveResume();
      return;
    }

    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = loadedFileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  const loadResume = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setLoadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          setFormData(JSON.parse(result));
        } catch (error) {
          console.error('Error loading resume:', error);
        }
      };
      reader.readAsText(file);
    }
  }

  const [opportunityId, setOpportunityId] = useState<string | null>(null);
  // State to hold the form data
  const [formData, setFormData] = useState<CVData>({

    summary: '',
    relevantSkills: [{ skillName: '', skillLevel: 1 }],
    experience: [{
      title: '',
      company: '',
      start: '',
      end: '',
      description: '',
      technologies: [''],
    }],
    educations: [{
      degree: '',
      school: '',
      start: '',
      end: '',
    }],
    certificates: [{
      name: '',
      institute: '',
      credential: '',
      issued: '',
      url: '',
    }],
    languageCodeOfJobDescription: '',
  });

  const [loadedFileName, setLoadedFileName] = useState<string | null>(null);


  const handleSkillChange = (index: number, field: string, value: string | number) => {
    const updatedSkills = [...formData.relevantSkills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setFormData(prev => ({ ...prev, relevantSkills: updatedSkills }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      relevantSkills: [...prev.relevantSkills, { skillName: '', skillLevel: 1 }]
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      relevantSkills: prev.relevantSkills.filter((_, i) => i !== index)
    }));
  };

  const handleExperienceChange = (index: number, field: string, value: string | string[]) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        title: '',
        company: '',
        start: '',
        end: '',
        description: '',
        technologies: [''],
      }]
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleTechnologyChange = (expIndex: number, techIndex: number, value: string) => {
    const updatedExperience = [...formData.experience];
    const updatedTechnologies = [...updatedExperience[expIndex].technologies];
    updatedTechnologies[techIndex] = value;
    updatedExperience[expIndex].technologies = updatedTechnologies;
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const addTechnology = (expIndex: number) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[expIndex].technologies.push('');
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const removeTechnology = (expIndex: number, techIndex: number) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[expIndex].technologies = updatedExperience[expIndex].technologies.filter((_, i) => i !== techIndex);
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducations = [...formData.educations];
    updatedEducations[index] = { ...updatedEducations[index], [field]: value };
    setFormData(prev => ({ ...prev, educations: updatedEducations }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      educations: [...prev.educations, { degree: '', school: '', start: '', end: '' }]
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      educations: prev.educations.filter((_, i) => i !== index)
    }));
  };

  const handleCertificateChange = (index: number, field: string, value: string) => {
    const updatedCertificates = [...formData.certificates];
    updatedCertificates[index] = { ...updatedCertificates[index], [field]: value };
    setFormData(prev => ({ ...prev, certificates: updatedCertificates }));
  };

  const addCertificate = () => {
    setFormData(prev => ({
      ...prev,
      certificates: [...prev.certificates, {
        name: '',
        institute: '',
        credential: '',
        issued: '',
        url: '',
      }]
    }));
  };

  const removeCertificate = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('cvData', JSON.stringify(formData));

    window.open('/ats', '_blank');
  };

  const [, setCopySuccess] = useState(false);
  const handleCopyDescription = async () => {
    try {
      // Get the job description text from the Redux store or fallback to job.description
      const textToCopy = JSON.stringify(formData, null, 2);
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Hide success message after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handlePasteDescription = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const parsed = JSON.parse(clipboardText);
      setFormData(parsed);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Show success message for 2 seconds
    } catch (err) {
      console.error('Failed to paste or parse JSON: ', err);
      // Could add user-facing error feedback here if needed
    }
  };

  const handleLoadDescription = () => {
    try {
      const storedData = localStorage.getItem("cvData");
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setFormData(parsed);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Show success message for 2 seconds
      } else {
        console.warn('No CV data found in localStorage');
      }
      const idProj = localStorage.getItem("opportunityId");
      if (idProj) {
        setOpportunityId(idProj);
      } else {
        console.warn('No opportunityId found in localStorage');
      }
    } catch (err) {
      console.error('Failed to load or parse CV data from localStorage: ', err);
      // Could add user-facing error feedback here if needed
    }
  };


  return (
    <CVLoadPageContainer>
      <PageTitle>CV Data Form</PageTitle>

      <JumpLineControl>

        <div className="mt-4">
          <label htmlFor="jsonFileInput" className="block text-sm font-medium text-gray-700 mb-2">
            Or load CV data from file:
          </label>
          <div className="flex items-center gap-2">
            <FormInput
              id="jsonFileInput"
              type="file"
              accept=".json"
              onChange={loadResume}
              className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {loadedFileName && (
              <Tooltip title="Save to original file location">
                <IconButton
                  onClick={() => saveResumeToOriginalLocation()}
                  size="small"
                  sx={{
                    color: '#6b7280',
                    '&:hover': { color: '#374151' }
                  }}
                >
                  <SaveIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
        <div>
          <IconButtonGroup>
            <Tooltip title="Copy CV data">
              <StyledIconButton
                onClick={handleCopyDescription}
                size="small"
              >
                <ContentCopyIcon fontSize="small" />
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Paste CV data from clipboard">
              <StyledIconButton
                onClick={handlePasteDescription}
                size="small"
              >
                <ContentPasteIcon fontSize="small" />
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Save CV data as file">
              <StyledIconButton
                onClick={saveResume}
                size="small"
              >
                <SaveIcon fontSize="small" />
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Load CV data from localStorage">
              <StyledIconButton
                onClick={handleLoadDescription}
                size="small"
              >
                <RefreshIcon fontSize="small" />
              </StyledIconButton>
            </Tooltip>
          </IconButtonGroup>
        </div>
      </JumpLineControl>
      <CVForm onSubmit={handleSubmit}>


        {/* Summary */}
        <Section>
          <SectionTitle>Summary</SectionTitle>
          <EditorContainer>
            <Editor
              value={formData.summary}
              onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              containerProps={{
                style: {
                  height: '400px',
                  border: 'none'
                }
              }}
            />
          </EditorContainer>
        </Section>

        {/* Skills */}
        <Section>
          <SectionTitle>Skills</SectionTitle>
          {formData.relevantSkills.map((skill, index) => (
            <SkillRow key={index}>
              <FormInput
                type="text"
                placeholder="Skill name"
                value={skill.skillName}
                onChange={(e) => handleSkillChange(index, 'skillName', e.target.value)}
                required
              />
              <FormInput
                type="number"
                placeholder="Level (1-10)"
                min="1"
                max="100"
                value={skill.skillLevel}
                onChange={(e) => handleSkillChange(index, 'skillLevel', parseInt(e.target.value))}
                className="skill-level"
                required
              />
              <Button
                type="button"
                onClick={() => removeSkill(index)}
                variant="danger"
              >
                Remove
              </Button>
            </SkillRow>
          ))}
          <Button
            type="button"
            onClick={addSkill}
            variant="primary"
          >
            Add Skill
          </Button>
        </Section>

        {/* Experience */}
        <Section>
          <SectionTitle>Experience</SectionTitle>
          {formData.experience.map((exp, expIndex) => (
            <ExperienceCard key={expIndex}>
              <GridContainer>
                <FormInput
                  type="text"
                  placeholder="Job title"
                  value={exp.title}
                  onChange={(e) => handleExperienceChange(expIndex, 'title', e.target.value)}
                  required
                />
                <FormInput
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(expIndex, 'company', e.target.value)}
                  required
                />
                <FormInput
                  type="date"
                  placeholder="Start date"
                  value={exp.start.length > 6 ? `${exp.start.substring(0, 7)}-01` : exp.start}
                  onChange={(e) => handleExperienceChange(expIndex, 'start', e.target.value)}
                  required
                />
                <FormInput
                  type="date"
                  placeholder="End date"
                  value={exp.end.length > 6 ? `${exp.end.substring(0, 7)}-01` : exp.end}
                  onChange={(e) => handleExperienceChange(expIndex, 'end', e.target.value)}
                />
              </GridContainer>
              <EditorContainer>
                <Editor
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(expIndex, 'description', e.target.value)}
                  containerProps={{
                    style: {
                      height: '300px',
                      border: 'none'
                    }
                  }}
                />
              </EditorContainer>

              <TechnologiesSubSection>
                <h4>Technologies:</h4>
                {exp.technologies.map((tech, techIndex) => (
                  <TechnologyRow key={techIndex}>
                    <TechnologyInput
                      type="text"
                      placeholder="Technology"
                      value={tech}
                      onChange={(e) => handleTechnologyChange(expIndex, techIndex, e.target.value)}
                      required
                    />
                    <SmallButton
                      type="button"
                      onClick={() => removeTechnology(expIndex, techIndex)}
                      variant="danger"
                    >
                      Remove
                    </SmallButton>
                  </TechnologyRow>
                ))}
                <SmallButton
                  type="button"
                  onClick={() => addTechnology(expIndex)}
                  variant="success"
                >
                  Add Technology
                </SmallButton>
              </TechnologiesSubSection>

              <Button
                type="button"
                onClick={() => removeExperience(expIndex)}
                variant="danger"
              >
                Remove Experience
              </Button>
            </ExperienceCard>
          ))}
          <Button
            type="button"
            onClick={addExperience}
            variant="primary"
          >
            Add Experience
          </Button>
        </Section>

        {/* Education */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          {formData.educations.map((edu, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                    required
                />
                <FormInput
                  type="text"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                                    required
                />
                <FormInput
                  type="date"
                  placeholder="Start date"
                  value={edu.start.length > 6 ? `${edu.start.substring(0, 7)}-01` : edu.start}
                  onChange={(e) => handleEducationChange(index, 'start', e.target.value)}
                                    required
                />
                <FormInput
                  type="date"
                  placeholder="End date"
                  value={edu.end.length > 6 ? `${edu.end.substring(0, 7)}-01` : edu.end}
                  onChange={(e) => handleEducationChange(index, 'end', e.target.value)}
                                    required
                />
              </div>
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Remove Education
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Education
          </button>
        </section>

        {/* Certificates */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Certificates</h2>
          {formData.certificates.map((cert, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  type="text"
                  placeholder="Certificate name"
                  value={cert.name}
                  onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
                                    required
                />
                <FormInput
                  type="text"
                  placeholder="Institute"
                  value={cert.institute}
                  onChange={(e) => handleCertificateChange(index, 'institute', e.target.value)}
                                    required
                />
                <FormInput
                  type="text"
                  placeholder="Credential"
                  value={cert.credential}
                  onChange={(e) => handleCertificateChange(index, 'credential', e.target.value)}
                  
                />
                <FormInput
                  type="date"
                  placeholder="Issued date"
                  value={cert.issued.length > 6 ? `${cert.issued.substring(0, 7)}-01` : cert.issued}
                  onChange={(e) => handleCertificateChange(index, 'issued', e.target.value)}
                                    required
                />
                <FormInput
                  type="url"
                  placeholder="Certificate URL"
                  value={cert.url}
                  onChange={(e) => handleCertificateChange(index, 'url', e.target.value)}
                  className="border p-3 rounded col-span-2"
                />
              </div>
              <button
                type="button"
                onClick={() => removeCertificate(index)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Remove Certificate
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCertificate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Certificate
          </button>
        </section>

        {/* Language Code */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Job Description Language</h2>
          <select
            value={formData.languageCodeOfJobDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, languageCodeOfJobDescription: e.target.value }))}
            className="border p-3 rounded w-full"
            required
          >
            <option value="">Select language</option>
            <option value="it">Italian</option>
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
          </select>
        </section>

        <Button
          type="submit"
          variant="green"
        >
          Save CV Data
        </Button>
      </CVForm>
      {/* Object */}
      <Section>
        <SectionHeader>
          <SectionTitle>Object</SectionTitle>
          
        </SectionHeader>
        <FormTextarea
          placeholder="All CV data in JSON format"
          value={JSON.stringify(formData, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setFormData(parsed);
            } catch (err) {
              console.error('Invalid JSON format:', err, e.target.value);
            }
          }}
        />
      </Section>
      <LinkInCurriculum />
    </CVLoadPageContainer>
  );
}
