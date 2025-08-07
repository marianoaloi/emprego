"use client"
import DataTable from '@/components/DataTable';
import TopMenu from '@/components/TopMenu';
import {
  PageContainer,
  ContentWrapper,
  Container,
  HeaderSection,
  Title,
  Subtitle,
  ContentCard
} from './page.styled';

export default function Home() {
  return (
    <PageContainer>
      <TopMenu />
      <ContentWrapper>
        <Container>
          <HeaderSection>
            <Title>
              Dashboard
            </Title>
            <Subtitle>
              Employment data from backend server
            </Subtitle>
          </HeaderSection>
          <ContentCard>
            <DataTable />
          </ContentCard>
        </Container>
      </ContentWrapper>
    </PageContainer>
  );
}
