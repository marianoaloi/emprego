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

generate a cover letter in ${lang} language, for a job application. The cover letter should be tailored to the job description and include an introduction, body, and conclusion. The introduction should briefly introduce myself and express my interest in the position. The body should highlight my relevant skills and experiences that make me a strong candidate for the position. Focus the cover letter in the skills [${skills.join(", ")}]. The conclusion should thank the employer for considering my application and express my enthusiasm for the opportunity to interview for the position. The cover letter should be professional, concise, and free of errors. Use a formal tone and avoid using slang or colloquial language. The cover letter should be no more than 1500 length. Also per linkedin_top I need a 400 characters resume of Cover Letter.
The JSON structure should be as follows:
{
"coverLetter": "...",
"linkedin_top: "...(max 400 characters)"
}
`;

  return prompt;
}