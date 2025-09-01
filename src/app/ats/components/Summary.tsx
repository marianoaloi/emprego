import React from 'react';
import { SummaryContainer, SummaryTitle, SummaryContent } from './Summary.styled';

interface SummaryProps {
  data: string;
  lang: string;
}

const Summary: React.FC<SummaryProps> = ({ data, lang }) => {
  const formatSummaryText = (text: string) => {
    return text.replace(/<[^>]*>/g, '').trim();
  };

  return (
    <SummaryContainer>
      <SummaryTitle>
        {lang === "it" ? "RIASSUNTO PROFESSIONALE" : "PROFESSIONAL SUMMARY"}
      </SummaryTitle>
      <SummaryContent>
        {formatSummaryText(data)}
      </SummaryContent>
      <SummaryContent>
        {lang === "it" ?
          "Grazie ai progressi nella capacità dell'IA Generativa di creare e gestire codice, sono costantemente aggiornato su Claude Code e Gemini CLI per guidare il team nella creazione di codice affidabile. Con Cursor e Copilot integrati nelle API, ci sono innumerevoli opportunità per lo sviluppo di soluzioni. La creazione di server MCP aiuta significativamente i componenti di sviluppo del codice a mantenere informazioni aggiornate."
          :
          "With the advancements in Generative AI's ability to create and maintain code, I'm constantly updated with Claude Code and Gemini CLI to guide the team in creating reliable code. With Cursor and Copilot integrated into APIs, there's plenty of opportunity for solution development. Creating MCP servers significantly helps code development components maintain up-to-date information."
        }
      </SummaryContent>
    </SummaryContainer>
  );
};

export default Summary;