import { drive_v3 } from "googleapis";

export default (rdata:drive_v3.Schema$File,data:any) =>{
  
    const { jobDescription, lang , skills } = data;
  const prompt = `Based on my json job experience data 
<experienceData>  
${JSON.stringify(rdata)}
</experienceData> 
and based on the following job description
<jobDescription>  
${jobDescription}
</jobDescription>
, generate a professional Curriculum Vitae in ATS JSON format. Never include the job description company name in the CV. The language of the CV should be "${lang}" (the same as the language of the job description). Focus the currilum in the skills [${skills.join(", ")}] The CV should be tailored to the job description and include sections for personal information, summary, work experience, education, and skills. Not to be prolix in write the summawy limit in 4 paragraphs, pleases highlight the technologies with bold html tag , add HTML tag in 'summary' and 'experience description' sections , not include empty tag or tag with only break line. Return all the companies experiences, if the experience with the company not match so much return a simple resume of the experience.  The JSON structure should be as follows: 
{
"summary": "...", 
"experience": [
    {
    "title": "...", 
    "company": "...", 
    "start": "...",
    "end": "...",
    "description": "...",
    "technologies":[...]
    }
], 
interistingProjects": [
    {
    "title": "...", 
    "description": "..."
    "hightlightsOfTheProject":[...]
    }
],
        
"relevantSkills": [{
    "skillName": "...",
    "skillLevel": "0...100"
}] ,
    
"languageCodeOfJobDescription": "it ... en ... pt"
}
`;

  return prompt;
}