# DataTable Component Style Guide

## Overview
This style guide documents the styling conventions for the DataTable component, specifically focusing on the subheader styling implementation using `@emotion/styled`.

## Style Architecture

### File Structure
- **Component**: `DataTable.tsx`
- **Styled Components**: `DataTable.styled.tsx`
- **Style Guide**: `DataTable.style-guide.md`

### Library Used
- `@emotion/styled` - For creating styled components with CSS-in-JS

## Subheader Styling Components

### SubheaderContainer
**Purpose**: Container for the subheader content that includes company name and last update date.

**Implementation**:
```typescript
export const SubheaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
```

**Usage**:
```tsx
<SubheaderContainer>
  <CompanyNameSpan>{job.companyName}</CompanyNameSpan>
  <Tooltip title={formatCompleteDateForTooltip(job.lastupdate)}>
    <LastUpdateSpan>
      {formatLastUpdate(job.lastupdate)}
    </LastUpdateSpan>
  </Tooltip>
</SubheaderContainer>
```

**Style Properties**:
- `display: flex` - Creates flexible layout
- `align-items: center` - Vertically centers content
- `gap: 8px` - Adds consistent spacing between elements

### CompanyNameSpan
**Purpose**: Wrapper for company name text within the subheader.

**Implementation**:
```typescript
export const CompanyNameSpan = styled.span`
  // No additional styling needed - inherits from parent CardHeader subheader styles
`;
```

**Inheritance**: Inherits styles from parent `.MuiCardHeader-subheader` class:
- `background-color: #1e3a8a` (blue background)
- `color: white`
- `padding: 0.25rem 0.75rem`
- `border-radius: 6px`
- `font-size: 0.875rem`
- `font-weight: 500`

### LastUpdateSpan
**Purpose**: Displays formatted last update date with hover effects.

**Implementation**:
```typescript
export const LastUpdateSpan = styled.span`
  font-size: 0.8em;
  color: #666;
  font-weight: 400;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;
```

**Style Properties**:
- `font-size: 0.8em` - Smaller text size relative to parent
- `color: #666` - Subtle gray color
- `font-weight: 400` - Normal weight (lighter than company name)
- `opacity: 0.8` - Semi-transparent by default
- `transition: opacity 0.2s ease` - Smooth hover transition
- `&:hover { opacity: 1 }` - Full opacity on hover

## Style Conventions

### Color Palette
- **Company Name Background**: `#1e3a8a` (Blue)
- **Company Name Text**: `white`
- **Last Update Text**: `#666` (Gray)
- **Hover Enhancement**: Opacity change from 0.8 to 1.0

### Typography Scale
- **Company Name**: `0.875rem` (inherited)
- **Last Update**: `0.8em` (relative to parent)

### Spacing System
- **Container Gap**: `8px`
- **Company Name Padding**: `0.25rem 0.75rem`

### Interactive States
- **Hover Effects**: 
  - Last update span increases opacity
  - Smooth 0.2s ease transition
  - Tooltip displays full date information

## Integration with MUI Components

### CardHeader Integration
The subheader styling integrates seamlessly with MUI's CardHeader component:

```tsx
<JobCardHeader
  title={...}
  subheader={
    <SubheaderContainer>
      {/* Styled subheader content */}
    </SubheaderContainer>
  }
/>
```

### Tooltip Integration
Last update date is wrapped with MUI Tooltip for enhanced UX:

```tsx
<Tooltip title={formatCompleteDateForTooltip(job.lastupdate)}>
  <LastUpdateSpan>
    {formatLastUpdate(job.lastupdate)}
  </LastUpdateSpan>
</Tooltip>
```

## Date Formatting

### Display Format
- **Format**: `MM-DD_HH-mm-ss`
- **Example**: `01-15_14-30-45`

### Tooltip Format
- **Format**: `YYYY-MM-DD HH:mm:ss`
- **Example**: `2024-01-15 14:30:45`

### Implementation
```typescript
const formatLastUpdate = (timestamp: number) => {
  return moment(timestamp).format('MM-DD_HH-mm-ss');
};

const formatCompleteDateForTooltip = (timestamp: number) => {
  return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
};
```

## Accessibility Considerations

### Semantic HTML
- Uses semantic `span` elements
- Maintains proper heading hierarchy
- Tooltip provides additional context

### Visual Hierarchy
- Company name has stronger visual weight (colored background)
- Last update is visually secondary (smaller, lighter)
- Clear spacing prevents visual confusion

### Interactive Feedback
- Hover states provide clear user feedback
- Tooltip appears on hover for additional information
- Smooth transitions enhance user experience

## Responsive Behavior

### Flex Layout Benefits
- Automatically adjusts to content length
- Maintains alignment across different screen sizes
- Graceful handling of long company names

### Mobile Considerations
- Font sizes use relative units (`em`) for better scaling
- Gap spacing provides adequate touch targets
- Tooltip functionality works on mobile devices

## Maintenance Guidelines

### Adding New Subheader Elements
1. Define new styled component in `DataTable.styled.tsx`
2. Add to SubheaderContainer with appropriate gap spacing
3. Follow existing color and typography conventions
4. Update imports in main component file
5. Document changes in this style guide

### Modifying Existing Styles
1. Update styled component definition
2. Test across different data scenarios
3. Verify accessibility standards are maintained
4. Update documentation as needed

### Style Consistency
- Follow existing naming conventions (PascalCase for components)
- Use consistent units (rem, em, px appropriately)
- Maintain color palette consistency
- Keep hover effects subtle and professional