"use client";
import { PageContainer, ContentWrapper, ContentCard } from "@/app/page.styled";
import { useAuth } from "@/components/auth/AuthContext";
import { functions } from "@/components/auth/firebaseConfig";
import TopMenu from "@/components/TopMenu";
import { Container } from "@mui/material";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoadCVPage() {


    const [jobDescription, setJobDescription] = useState("");
    const [opportunityId, setOpportunityId] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, loading: authLoading, getAuthToken } = useAuth();
    const [lang, setLang] = useState("en");
    const [invalitita, setInvalitita] = useState(false);
    const [skillsJob, setSkillsJob] = useState<string | null>(null);

    if (!user && !authLoading) {

        return (<h1>NO CAN USE</h1>);
    }

    async function handleGenerate(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        setLoading(true);

        const generateCv = httpsCallable(functions, "generateCv");
        try {
            const token = await getAuthToken();
            const result = await generateCv({
                jobDescription: jobDescription,
                authToken: token,
                lang: lang,
                invalitita: invalitita,
                skills: skillsJob ? skillsJob.split(";") : [],
            });
            const cvData = result.data;
            // Store CV data and opportunity ID in local storage to pass to the CV page
            localStorage.setItem("cvData", JSON.stringify(cvData));
            localStorage.setItem("opportunityId", opportunityId);
            localStorage.setItem("lang", lang);
            window.open('/ats', '_blank');
        } catch (error) {
            console.error("Error generating CV:", error);
            alert("Error generating CV. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <PageContainer>
            <TopMenu />
            <ContentWrapper>
                <Container>
                    <ContentCard>

                        {/* Job Generation Section */}
                        <section className="bg-blue-50 p-6 rounded-lg shadow">
                            <h2 className="text-2xl font-semibold mb-4">Job Generation</h2>

                            {/* Job Description */}
                            <div className="mb-4">
                                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Description
                                </label>
                                <textarea
                                    id="jobDescription"
                                    placeholder="Enter the job description..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className="border p-3 rounded w-full h-32"
                                    rows={4}
                                />
                            </div>

                            {/* Language Selection */}
                            <div className="mb-4">
                                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Description Language
                                </label>
                                <select
                                    id="language"
                                    value={lang}
                                    onChange={(e) => setLang(e.target.value)}
                                    className="border p-3 rounded w-full"
                                >
                                    <option value="en">English</option>
                                    <option value="pt">Portuguese</option>
                                    <option value="it">Italian</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="invalitita" className="block text-sm font-medium text-gray-700 mb-2">
                                    Invalitita
                                </label>
                                <input
                                    id="invalitita"
                                    type="checkbox"
                                    checked={invalitita}
                                    onChange={(e) => setInvalitita(e.target.checked)}
                                    className="border p-3 rounded w-full"
                                />
                            </div>

                            {/* Opportunity ID */}
                            <div className="mb-4">
                                <label htmlFor="opportunityIdField" className="block text-sm font-medium text-gray-700 mb-2">
                                    Opportunity ID
                                </label>
                                <input
                                    id="opportunityIdField"
                                    type="text"
                                    placeholder="Enter opportunity ID..."
                                    value={opportunityId || ''}
                                    onChange={(e) => setOpportunityId(e.target.value)}
                                    className="border p-3 rounded w-full"
                                />
                            </div>

                            {/* Skills Job */}
                            <div className="mb-4">
                                <label htmlFor="skillsJob" className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Skills (separate with semicolon ;)
                                </label>
                                <input
                                    id="skillsJob"
                                    type="text"
                                    placeholder="React; TypeScript; Node.js; MongoDB"
                                    value={skillsJob || ''}
                                    onChange={(e) => setSkillsJob(e.target.value)}
                                    className="border p-3 rounded w-full"
                                />
                            </div>

                            {/* Generate Button */}
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={handleGenerate}
                                    disabled={loading}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Generating...' : 'Generate CV'}
                                </button>
                                {loading && (
                                    <span className="text-blue-600 font-medium">Generating...</span>
                                )}
                            </div>
                        </section>
                    </ContentCard>
                </Container>
            </ContentWrapper>
        </PageContainer>
    );
}