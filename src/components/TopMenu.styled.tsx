import styled from '@emotion/styled';

export const Nav = styled.nav`
  background-color: #2563eb; /* bg-blue-600 */
  color: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); /* shadow-lg */
`;

export const NavContainer = styled.div`
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

export const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem; /* h-16 */
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.25rem; /* text-xl */
  font-weight: 700; /* font-bold */
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* space-x-4 */
`;

export const FilterButton = styled.button`
  background-color: #1d4ed8; /* bg-blue-700 */
  padding: 0.5rem 1rem; /* px-4 py-2 */
  border-radius: 0.375rem; /* rounded-md */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out; /* transition-colors duration-200 */
  border: none;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #1e40af; /* hover:bg-blue-800 */
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;