export default
    interface CVData {

    summary: string;
    invalitita:boolean;
    relevantSkills: Array<{
        skillName: string;
        skillLevel: number;
    }>;
    experience: Array<{
        title: string;
        company: string;
        end: string;
        start: string;
        description: string;
        technologies: string[];
    }>;
    educations: Array<{
        degree: string;
        school: string;
        start: string;
        end: string;
    }>;
    certificates: Array<{
        name: string;
        institute: string;
        credential: string;
        issued: string;
        url?: string;
    }>;
    languageCodeOfJobDescription: string;
}

