# Style Guide for TopMenu and JobSearchModal Components

This document outlines the styling conventions and patterns used in the TopMenu and JobSearchModal components, which have been refactored to use styled-components with the @emotion/styled library.

## Overview

Both components have been refactored to extract all inline Tailwind CSS classes into reusable styled components. This approach provides better component composition, type safety, and maintainability.

## Component Structure

### TopMenu Component
- **Main File**: `src/components/TopMenu.tsx`
- **Styles File**: `src/components/TopMenu.styled.tsx`

### JobSearchModal Component  
- **Main File**: `src/components/JobSearchModal.tsx`
- **Styles File**: `src/components/JobSearchModal.styled.tsx`

## Styling Conventions

### 1. Color Palette
- **Primary Blue**: `#2563eb` (Tailwind's blue-600)
- **Primary Blue Hover**: `#1d4ed8` (Tailwind's blue-700)  
- **Primary Blue Dark**: `#1e40af` (Tailwind's blue-800)
- **Text Primary**: `#111827` (Tailwind's gray-900)
- **Text Secondary**: `#374151` (Tailwind's gray-700)
- **Text Muted**: `#9ca3af` (Tailwind's gray-400)
- **Border**: `#d1d5db` (Tailwind's gray-300)
- **Background Secondary**: `#e5e7eb` (Tailwind's gray-200)

### 2. Spacing System
- **Small Padding**: `0.5rem` (8px)
- **Medium Padding**: `1rem` (16px) 
- **Large Padding**: `1.5rem` (24px)
- **Form Field Spacing**: `0.25rem` margin-bottom for labels
- **Button Spacing**: `0.75rem` gap between buttons

### 3. Typography
- **Title Font Size**: `1.25rem` (20px) with `font-weight: 700`
- **Label Font Size**: `0.875rem` (14px) with `font-weight: 500`
- **Button Font Size**: `0.875rem` (14px) with `font-weight: 500`
- **Modal Title**: `1.25rem` (20px) with `font-weight: 700`

### 4. Border Radius
- **Standard**: `0.375rem` (6px)
- **Large**: `0.5rem` (8px) for modal containers

### 5. Responsive Design
- **Mobile First**: Base styles for mobile, media queries for larger screens
- **Breakpoints**:
  - `640px` (sm): Small tablets
  - `768px` (md): Medium tablets and small desktops
  - `1024px` (lg): Large desktops

## TopMenu Styled Components

### Nav
- Primary blue background with white text
- Box shadow for elevation
- Full width container

### NavContainer
- Responsive max-width (80rem on large screens)
- Responsive horizontal padding
- Centered content

### NavContent
- Flexbox layout with space-between alignment
- Fixed height of 4rem

### FilterButton
- Primary blue background with darker hover state
- Smooth color transitions (200ms)
- Focus outline with blue shadow

## JobSearchModal Styled Components

### Layout Components
- **ModalOverlay**: Fixed fullscreen overlay with semi-transparent background
- **ModalContainer**: White rounded container with max-width and scrollable content
- **ModalHeader**: Flex header with space-between alignment

### Form Components
- **FormGrid**: Responsive grid (1 column on mobile, 2 on desktop)
- **CheckboxGrid**: Responsive grid (2 columns on mobile, 4 on desktop)
- **FormField**: Column flex container for form inputs

### Input Components
- **Input/Select**: Full width with consistent padding and focus styles
- **Checkbox**: Fixed size (1rem) with blue accent color
- **Label/CheckboxLabel**: Consistent typography and spacing

### Button Components
- **PrimaryButton**: Blue background with white text
- **SecondaryButton**: Gray background with dark text
- Both have hover states and focus outlines

## Focus Management

All interactive elements include proper focus styles:
- **Focus Ring**: 2px shadow with blue color (`rgba(59, 130, 246, 0.5)`)
- **Focus Outline**: Removed default browser outline in favor of box-shadow
- **Keyboard Navigation**: All buttons and inputs are keyboard accessible

## Hover States

Consistent hover behavior across components:
- **Color Transitions**: 200ms ease-in-out timing
- **Background Changes**: Darker shades for hover states
- **Visual Feedback**: Clear indication of interactive elements

## Responsive Behavior

### TopMenu
- Consistent padding across screen sizes
- Text and buttons scale appropriately
- Navigation remains accessible on all devices

### JobSearchModal  
- **Mobile**: Single column grid, stacked checkboxes
- **Desktop**: Two-column grid, four-column checkbox layout
- **Scroll**: Modal content scrolls when height exceeds 80vh

## Best Practices Implemented

1. **Semantic HTML**: Proper use of nav, form, label, and button elements
2. **Accessibility**: Focus management, proper labeling, keyboard navigation
3. **Performance**: Efficient CSS-in-JS with @emotion/styled
4. **Maintainability**: Separated styles from logic, reusable components
5. **Consistency**: Unified color palette and spacing system
6. **Responsive**: Mobile-first approach with progressive enhancement

## Usage Examples

```tsx
// TopMenu usage
import TopMenu from './components/TopMenu';

function App() {
  return <TopMenu />;
}

// JobSearchModal usage  
import JobSearchModal from './components/JobSearchModal';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <JobSearchModal 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)} 
    />
  );
}
```

## Migration Notes

- All Tailwind classes have been converted to equivalent styled-components
- Component APIs remain unchanged - no breaking changes
- TypeScript support maintained throughout
- Focus and accessibility behaviors preserved
- Responsive breakpoints match Tailwind conventions

This style guide ensures consistent styling across both components while maintaining the flexibility and reusability that styled-components provide.