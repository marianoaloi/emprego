"use client"
import DataTable from '@/components/DataTable';
import TopMenu from '@/components/TopMenu';
import {
  PageContainer,
  ContentWrapper,
  Container,
  ContentCard
} from './page.styled';

export default function Home() {
  return (
    <PageContainer>
      <TopMenu />
      <ContentWrapper>
        <Container>
          <ContentCard>
            <DataTable />
          </ContentCard>
        </Container>
      </ContentWrapper>
    </PageContainer>
  );
}
