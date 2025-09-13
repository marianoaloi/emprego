
'use client';

import { useState } from 'react';
import CVData from '@/components/util/CVData';
import { IconButton, Tooltip, } from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  ContentPaste as ContentPasteIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { LinkInCurriculum } from '@/components/util/linkCV';
import Editor from 'react-simple-wysiwyg';



export default function CVLoadPage() {


  const saveResume =() => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cv_data_${new Date().getTime()}.resume.json`;
    link.click();
  }

  const saveResumeToOriginalLocation = () => {
    if (!loadedFileName) return;
    
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = loadedFileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  const loadResume =(event: any) => {
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
    } catch (err) {
      console.error('Failed to load or parse CV data from localStorage: ', err);
      // Could add user-facing error feedback here if needed
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">CV Data Form</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        

        {/* Summary */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <div className="border rounded">
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
          </div>
        </section>

        {/* Skills */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          {formData.relevantSkills.map((skill, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Skill name"
                value={skill.skillName}
                onChange={(e) => handleSkillChange(index, 'skillName', e.target.value)}
                className="border p-3 rounded flex-1"
                required
              />
              <input
                type="number"
                placeholder="Level (1-10)"
                min="1"
                max="100"
                value={skill.skillLevel}
                onChange={(e) => handleSkillChange(index, 'skillLevel', parseInt(e.target.value))}
                className="border p-3 rounded w-24"
                required
              />
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSkill}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Skill
          </button>
        </section>

        {/* Experience */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          {formData.experience.map((exp, expIndex) => (
            <div key={expIndex} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Job title"
                  value={exp.title}
                  onChange={(e) => handleExperienceChange(expIndex, 'title', e.target.value)}
                  className="border p-3 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(expIndex, 'company', e.target.value)}
                  className="border p-3 rounded"
                  required
                />
                <input
                  type="date"
                  placeholder="Start date"
                  value={exp.start.length > 6 ? `${exp.start.substring(0, 7)}-01` : exp.start}
                  onChange={(e) => handleExperienceChange(expIndex, 'start', e.target.value)}
                  className="border p-3 rounded"
                  required
                />
                <input
                  type="date"
                  placeholder="End date"
                  value={exp.end.length > 6 ? `${exp.end.substring(0, 7)}-01` : exp.end}
                  onChange={(e) => handleExperienceChange(expIndex, 'end', e.target.value)}
                  className="border p-3 rounded"
                  required
                />
              </div>
              <div className="border rounded mb-4">
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
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Technologies:</h4>
                {exp.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Technology"
                      value={tech}
                      onChange={(e) => handleTechnologyChange(expIndex, techIndex, e.target.value)}
                      className="border p-2 rounded flex-1"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeTechnology(expIndex, techIndex)}
                      className="bg-red-500 text-white px-3 py-2 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addTechnology(expIndex)}
                  className="bg-green-500 text-white px-3 py-2 rounded text-sm"
                >
                  Add Technology
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeExperience(expIndex)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove Experience
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Experience
          </button>
        </section>

        {/* Education */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          {formData.educations.map((edu, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  className="border p-3 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                  className="border p-3 rounded"
                  required
                />
                <input
                  type="date"
                  placeholder="Start date"
                  value={edu.start.length > 6 ? `${edu.start.substring(0, 7)}-01` : edu.start}
                  onChange={(e) => handleEducationChange(index, 'start', e.target.value)}
                  className="border p-3 rounded"
                  required
                />
                <input
                  type="date"
                  placeholder="End date"
                  value={edu.end.length > 6 ? `${edu.end.substring(0, 7)}-01` : edu.end}
                  onChange={(e) => handleEducationChange(index, 'end', e.target.value)}
                  className="border p-3 rounded"
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
                <input
                  type="text"
                  placeholder="Certificate name"
                  value={cert.name}
                  onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
                  className="border p-3 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Institute"
                  value={cert.institute}
                  onChange={(e) => handleCertificateChange(index, 'institute', e.target.value)}
                  className="border p-3 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Credential"
                  value={cert.credential}
                  onChange={(e) => handleCertificateChange(index, 'credential', e.target.value)}
                  className="border p-3 rounded"
                  
                />
                <input
                  type="date"
                  placeholder="Issued date"
                  value={cert.issued.length > 6 ? `${cert.issued.substring(0, 7)}-01` : cert.issued}
                  onChange={(e) => handleCertificateChange(index, 'issued', e.target.value)}
                  className="border p-3 rounded"
                  required
                />
                <input
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

        <button
          type="submit"
          className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold w-full"
        >
          Save CV Data
        </button>
      </form>
      {/* Object */}
      <section className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Object</h2>
          <div className="flex gap-2">
            <Tooltip title="Copy CV data">
              <IconButton
                onClick={handleCopyDescription}
                size="small"
                sx={{
                  color: '#6b7280',
                  '&:hover': { color: '#374151' }
                }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Paste CV data from clipboard">
              <IconButton
                onClick={handlePasteDescription}
                size="small"
                sx={{
                  color: '#6b7280',
                  '&:hover': { color: '#374151' }
                }}
              >
                <ContentPasteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save CV data as file">
              <IconButton
                onClick={saveResume}
                size="small"
                sx={{
                  color: '#6b7280',
                  '&:hover': { color: '#374151' }
                }}
              >
                <SaveIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Load CV data from localStorage">
              <IconButton
                onClick={handleLoadDescription}
                size="small"
                sx={{
                  color: '#6b7280',
                  '&:hover': { color: '#374151' }
                }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <textarea
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
          className="border p-3 rounded w-full h-32"

        />
        <div className="mt-4">
          <label htmlFor="jsonFileInput" className="block text-sm font-medium text-gray-700 mb-2">
            Or load CV data from file:
          </label>
          <div className="flex items-center gap-2">
            <input
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
      </section>
      <LinkInCurriculum />
    </div>
  );
}
