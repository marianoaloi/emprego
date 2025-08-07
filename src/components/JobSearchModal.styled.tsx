import styled from '@emotion/styled';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; /* inset-0 */
  background-color: rgba(0, 0, 0, 0.5); /* bg-black bg-opacity-50 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50; /* z-50 */
`;

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem; /* rounded-lg */
  padding: 1.5rem; /* p-6 */
  width: 100%;
  max-width: 42rem; /* max-w-2xl */
  max-height: 80vh; /* max-h-[80vh] */
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem; /* mb-4 */
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem; /* text-xl */
  font-weight: 700; /* font-bold */
  color: #111827; /* text-gray-900 */
`;

export const CloseButton = styled.button`
  color: #9ca3af; /* text-gray-400 */
  font-size: 1.5rem; /* text-2xl */
  border: none;
  background: transparent;
  cursor: pointer;
  
  &:hover {
    color: #4b5563; /* hover:text-gray-600 */
  }
  
  &:focus {
    outline: none;
    color: #4b5563;
  }
`;

export const Form = styled.form`
  display: flex;
  color: black;
  flex-direction: column;
  gap: 1rem; /* space-y-4 */
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem; /* gap-4 */
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* md:grid-cols-2 */
  }
`;

export const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem; /* gap-4 */
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr); /* md:grid-cols-4 */
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #374151; /* text-gray-700 */
  margin-bottom: 0.25rem; /* mb-1 */
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem; /* px-3 py-2 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.375rem; /* rounded-md */
  
  &:focus {
    outline: none;
    border-color: #3b82f6; /* focus:ring-blue-500 */
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* focus:ring-2 */
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem; /* px-3 py-2 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.375rem; /* rounded-md */
  
  &:focus {
    outline: none;
    border-color: #3b82f6; /* focus:ring-blue-500 */
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* focus:ring-2 */
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Checkbox = styled.input`
  height: 1rem; /* h-4 */
  width: 1rem; /* w-4 */
  color: #2563eb; /* text-blue-600 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.25rem; /* rounded */
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* focus:ring-blue-500 */
  }
`;

export const CheckboxLabel = styled.label`
  margin-left: 0.5rem; /* ml-2 */
  display: block;
  font-size: 0.875rem; /* text-sm */
  color: #111827; /* text-gray-900 */
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem; /* space-x-3 */
  padding-top: 1rem; /* pt-4 */
`;

export const SecondaryButton = styled.button`
  padding: 0.5rem 1rem; /* px-4 py-2 */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #374151; /* text-gray-700 */
  background-color: #e5e7eb; /* bg-gray-200 */
  border: none;
  border-radius: 0.375rem; /* rounded-md */
  transition: background-color 0.2s ease-in-out; /* transition-colors duration-200 */
  cursor: pointer;
  
  &:hover {
    background-color: #d1d5db; /* hover:bg-gray-300 */
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(156, 163, 175, 0.5);
  }
`;

export const PrimaryButton = styled.button`
  padding: 0.5rem 1rem; /* px-4 py-2 */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: white;
  background-color: #2563eb; /* bg-blue-600 */
  border: none;
  border-radius: 0.375rem; /* rounded-md */
  transition: background-color 0.2s ease-in-out; /* transition-colors duration-200 */
  cursor: pointer;
  
  &:hover {
    background-color: #1d4ed8; /* hover:bg-blue-700 */
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;