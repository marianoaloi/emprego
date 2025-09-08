
'use client';

import { useState } from 'react';
import CVData from '@/components/util/CVData';
import { IconButton, Tooltip, } from '@mui/material';
import {
  ContentCopy as ContentCopyIcon
} from '@mui/icons-material';

export default function CVLoadPage() {
  const [formData, setFormData] = useState<CVData>({
    personalInformation: {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
    },
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

  const handlePersonalInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInformation: { ...prev.personalInformation, [field]: value }
    }));
  };

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

  const [copySuccess, setCopySuccess] = useState(false);
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">CV Data Form</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.personalInformation.name}
              onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
              className="border p-3 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.personalInformation.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              className="border p-3 rounded"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.personalInformation.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              className="border p-3 rounded"
              required
            />
            <input
              type="url"
              placeholder="LinkedIn"
              value={formData.personalInformation.linkedin}
              onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
              className="border p-3 rounded"
              required
            />
          </div>
        </section>

        {/* Summary */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <textarea
            placeholder="Professional summary"
            value={formData.summary}
            onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
            className="border p-3 rounded w-full h-32"
            required
          />
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
                max="10"
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
                  value={exp.start}
                  onChange={(e) => handleExperienceChange(expIndex, 'start', e.target.value)}
                  className="border p-3 rounded"
                  required
                />
                <input
                  type="date"
                  placeholder="End date"
                  value={exp.end}
                  onChange={(e) => handleExperienceChange(expIndex, 'end', e.target.value)}
                  className="border p-3 rounded"
                  required
                />
              </div>
              <textarea
                placeholder="Job description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(expIndex, 'description', e.target.value)}
                className="border p-3 rounded w-full h-24 mb-4"
                required
              />

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
                  value={edu.start}
                  onChange={(e) => handleEducationChange(index, 'start', e.target.value)}
                  className="border p-3 rounded"
                  required
                />
                <input
                  type="date"
                  placeholder="End date"
                  value={edu.end}
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
                  required
                />
                <input
                  type="date"
                  placeholder="Issued date"
                  value={cert.issued}
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
                  required
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
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="pt">Portuguese</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </section>

        <button
          type="submit"
          className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold w-full"
        >
          Save CV Data
        </button>
      </form>
      <Tooltip title="Copy job description">
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

      
        {/* Object */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Object</h2>
          <textarea
            placeholder="All CV data in JSON format"
            value={JSON.stringify(formData, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                setFormData(parsed);
              } catch (err) {
                console.error('Invalid JSON format:', err , e.target.value);
              }
            }}
            className="border p-3 rounded w-full h-32"
            
          />
        </section>
    </div>
  );
}