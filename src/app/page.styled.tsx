import styled from '@emotion/styled';

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb; /* bg-gray-50 */
`;

export const ContentWrapper = styled.div`
  padding-top: 2rem; /* py-8 */
  padding-bottom: 2rem;
`;

export const Container = styled.div`
  max-width: 80rem; /* max-w-7xl */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem; /* px-4 */
  padding-right: 1rem;
  
  @media (min-width: 640px) {
    padding-left: 1.5rem; /* sm:px-6 */
    padding-right: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    padding-left: 2rem; /* lg:px-8 */
    padding-right: 2rem;
  }
`;

export const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem; /* mb-8 */
`;

export const Title = styled.h1`
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700; /* font-bold */
  color: #111827; /* text-gray-900 */
  margin-bottom: 0.5rem; /* mb-2 */
  line-height: 1.25;
`;

export const Subtitle = styled.p`
  font-size: 1.125rem; /* text-lg */
  color: #4b5563; /* text-gray-600 */
  line-height: 1.75;
`;

export const ContentCard = styled.div`
  background-color: white;
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  padding: 1.5rem; /* p-6 */
`;