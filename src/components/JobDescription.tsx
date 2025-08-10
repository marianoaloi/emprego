'use client';

import React, { useEffect, useMemo } from 'react';
import { CircularProgress } from '@mui/material';
import {
  JobDescriptionContainer,
  LoadingContainer,
  ErrorContainer,
  FormattedContent,
  RetryButton
} from './JobDescription.styled';
import {
  JobDescriptionProps,
  TextAttribute
} from '@/types/job-description.types';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchJobText } from '@/lib/features/textJob/textJobTruck';

// Unicode-aware string utilities
const stringToCodePoints = (str: string): number[] => {
  return Array.from(str, (char) => char.codePointAt(0)!);
};

const codePointsToString = (codePoints: number[]): string => {
  return String.fromCodePoint(...codePoints);
};

const getUnicodeSubstring = (text: string, start: number, end: number): string => {
  const codePoints = stringToCodePoints(text);
  const substring = codePoints.slice(start, end);
  return codePointsToString(substring);
};

// Function to convert byte positions to Unicode code point positions
const convertBytePositionToCodePoint = (text: string, bytePosition: number): number => {
  const codePoints = stringToCodePoints(text);
  let currentBytePosition = 0;
  
  for (let i = 0; i < codePoints.length; i++) {
    const codePoint = codePoints[i];
    

    
    // Calculate UTF-16 code units for this code point
    if (codePoint <= 0xFFFF) {
      currentBytePosition += 1; // Single UTF-16 code unit
    } else {
      currentBytePosition += 2; // Surrogate pair (2 UTF-16 code units)
    }
  }
  
  return currentBytePosition;
};

// Function to apply formatting attributes to text
const formatTextWithAttributes = (text: string, attributes: Record<string, TextAttribute>): React.ReactNode => {
  // Convert attributes object to array and sort by start position
  const attributesList = Object.values(attributes).sort((a, b) => (a.start + a.length) - (b.start + b.length));

  // Create segments with their formatting
  const segments: Array<{
    text: string;
    start: number;
    end: number;
    classes: string[];
    isListItem?: boolean;
    isLineBreak?: boolean;
    hyperlink?: string;
    listType?: 'ordered' | 'unordered';
  }> = [];

  let diffEmoji = 0
  // Build segments from attributes
  attributesList.forEach(
    (attr: TextAttribute, index: number, array: TextAttribute[]) => {
      if (attr.attributeKindUnion.list) {
        return;
      }
      if (attr.attributeKindUnion.lineBreak
        &&
        index>0
        &&
        array[index - 1].attributeKindUnion.lineBreak
      ) {
        return;
      }
      
      // Convert byte positions to Unicode code point positions
      const startCodePoint =  attr.start + diffEmoji;
      diffEmoji += convertBytePositionToCodePoint(text.substring(startCodePoint,startCodePoint + attr.length),  attr.length) - attr.length;
      const endCodePoint = startCodePoint + attr.length;
      const segmentText = getUnicodeSubstring(text, startCodePoint, endCodePoint);

      const classes: string[] = [];
      let isListItem = false;
      let isLineBreak = false;
      let listType: 'ordered' | 'unordered' | undefined;
      let hyperlink: string | undefined;

      // Determine formatting classes
      if (attr.attributeKindUnion.bold) {
        classes.push('bold');
      }
      if (attr.attributeKindUnion.italic) {
        classes.push('italic');
      }
      if (attr.attributeKindUnion.listItem) {
        classes.push('list-item');
        isListItem = true;
      }
      if (attr.attributeKindUnion.lineBreak) {
        isLineBreak = true;
        classes.push('line-break');
      }
      if (attr.attributeKindUnion.underline) {
        classes.push('underline');
      }
      if (attr.attributeKindUnion.hyperlink) {
        classes.push('hyperlink');
        hyperlink = attr.attributeKindUnion.hyperlink.url
      }
      if (attr.attributeKindUnion.superscript) {
        classes.push('superscript');
      }
      if (attr.attributeKindUnion.paragraph) {
        classes.push('paragraph');
      }

      segments.push({
        text: segmentText,
        start: startCodePoint,
        end: endCodePoint,
        classes,
        isListItem,
        isLineBreak,
        listType,
        hyperlink
      });
    });

  // Group list items and create proper list structure
  const processedElements: React.ReactNode[] = [];
  let currentListItems: typeof segments = [];
  let currentListType: 'ordered' | 'unordered' | null = null;
  let elementKey = 0;

  const flushList = () => {
    if (currentListItems.length > 0) {
      const listClass = `list ${currentListType}`;
      processedElements.push(
        <div key={`list-${elementKey++}`} className={listClass}>
          {currentListItems.map((item, index) => (
            <div key={`item-${index}`} className="list-item">
              {item.text}
            </div>
          ))}
        </div>
      );
      currentListItems = [];
      currentListType = null;
    }
  };

  // Process segments into React elements
  segments.forEach(segment => {
    if (segment.isLineBreak) {
      flushList();
      processedElements.push(<br key={`br-${elementKey++}`} />);
    } else if (segment.isListItem) {
      // Determine list type from context or default to unordered
      const listType = segment.listType || 'unordered';

      if (currentListType !== listType) {
        flushList();
        currentListType = listType;
      }
      currentListItems.push(segment);
    } else {
      flushList();

      if (segment.hyperlink) {
        processedElements.push(
          <a
            key={`hyperlink-${elementKey++}`}
            className='hyperlink'
            href={segment.hyperlink}>
            {segment.text}
          </a>
        )

      } else if (segment.classes.length > 0) {
        processedElements.push(
          <span key={`span-${elementKey++}`} className={segment.classes.join(' ')}>
            {segment.text}
          </span>
        );
      } else {
        // Handle unformatted text using Unicode-safe substring
        const previousEnd = segments[segments.indexOf(segment) - 1]?.end || 0;
        const unformattedText = getUnicodeSubstring(text, previousEnd, segment.start);
        if (unformattedText) {
          processedElements.push(unformattedText);
        }
        processedElements.push(segment.text);
      }
    }
  });

  // Flush any remaining list items
  flushList();

  // Handle any remaining unformatted text at the end
  const lastSegment = segments[segments.length - 1];
  const textLength = stringToCodePoints(text).length;
  if (lastSegment && lastSegment.end < textLength) {
    const remainingText = getUnicodeSubstring(text, lastSegment.end, textLength);
    processedElements.push(remainingText);
  }

  // If no segments, return the original text
  if (segments.length === 0) {
    return text;
  }

  return processedElements;
};

export default function JobDescription({ jobId, className }: JobDescriptionProps) {
  const dispatch = useAppDispatch();
  
  // Get description from Redux state
  const description = useAppSelector(state => state.textJob.descriptions[jobId]);
  const loadingState = useAppSelector(state => state.textJob.loadingStates[jobId]);
  
  const loading = loadingState?.loading || false;
  const error = loadingState?.error || null;

  useEffect(() => {
    if (jobId && !description && !loading) {
      dispatch(fetchJobText(jobId));
    }
  }, [jobId, description, loading, dispatch]);

  const formattedContent = useMemo(() => {
    if (!description) return null;
    return formatTextWithAttributes(description.text, description.attributes);
  }, [description]);

  if (loading) {
    return (
      <JobDescriptionContainer className={className}>
        <LoadingContainer>
          <CircularProgress size={24} />
          <span style={{ marginLeft: '8px' }}>Loading job description...</span>
        </LoadingContainer>
      </JobDescriptionContainer>
    );
  }

  if (error) {
    return (
      <JobDescriptionContainer className={className}>
        <ErrorContainer>
          <div>Error loading job description: {error}</div>
          <RetryButton onClick={() => dispatch(fetchJobText(jobId))}>
            Retry
          </RetryButton>
        </ErrorContainer>
      </JobDescriptionContainer>
    );
  }

  if (!description) {
    return (
      <JobDescriptionContainer className={className}>
        <div style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
          No job description available
        </div>
      </JobDescriptionContainer>
    );
  }

  return (
    <JobDescriptionContainer className={className}>
      <FormattedContent>
        {formattedContent}
      </FormattedContent>
    </JobDescriptionContainer>
  );
}