'use client';

import React, { useEffect, useMemo } from 'react';
import { CircularProgress } from '@mui/material';
import {
  JobDescriptionContainer,
  LoadingContainer,
  ErrorContainer,
  FormattedContent,
  RetryButton,
  JobDetailBold,
  JobDetailHyperlink,
  JobDetailItalic,
  JobDetailLineBreak,
  JobDetailListOrdered,
  JobDetailListUnordered,
  JobDetailParagraph,
  JobDetailListItem,
  JobDetailSuperscript,
  JobDetailUnderline
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

// Function to calculate the difference in UTF-16 code units for a text segment
const getCodeUnitDifference = (text: string, length: number): number => {
  const codePoints = stringToCodePoints(text);
  let currentBytePosition = 0;

  for (let i = 0; i < Math.min(codePoints.length, length); i++) {
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
  const attributesList = Object.values(attributes).sort((a, b) => a.start !== b.start ? (a.start) - (b.start)
    : (b.length) - (a.length)
  );

  interface LinkedinSegment {
    index: number;
    text: React.ReactNode;
    start: number;
    end: number;
    attributeKindUnion?: TextAttribute['attributeKindUnion'];
    unformated?: boolean;
    children: LinkedinSegment[]
  }
  // Create segments with their formatting
  let segments: Array<LinkedinSegment> = [];

  let diffEmoji = 0
  // Build segments from attributes
  attributesList.forEach(
    (attr: TextAttribute, index: number) => {

      if (attr.attributeKindUnion.lineBreak
        &&
        index > 0
        &&
        attributesList[index - 1].attributeKindUnion.lineBreak
      ) {
        return;
      }
      
      // Convert byte positions to Unicode code point positions
      const startCodePoint = attr.start + diffEmoji;
      diffEmoji += getCodeUnitDifference(text.substring(startCodePoint, startCodePoint + attr.length), attr.length) - attr.length;
      const endCodePoint = startCodePoint + attr.length;
      const segmentText = getUnicodeSubstring(text, startCodePoint, endCodePoint);

      const previousEnd = segments[segments.length - 1]?.end || 0;
      const unformattedText = getUnicodeSubstring(text, previousEnd, startCodePoint);
      if (unformattedText) {
        const unformated = true;
        segments.push({
          index,
          text: unformattedText,
          start: previousEnd,
          end: startCodePoint,
          unformated,
          children: []
        });
      }


      segments.push({
        index,
        text: segmentText,
        start: startCodePoint,
        end: endCodePoint,
        attributeKindUnion: attr.attributeKindUnion,
        children: []
      });
    });

  // Group list items and create proper list structure
  const processedElements: React.ReactNode[] = [];
  let elementKey = 0;

  const childrens = (segmentsInter: LinkedinSegment[]): LinkedinSegment[] => {
    let childrensAux: LinkedinSegment[] = [];
    segmentsInter.forEach(fatherSeg => {
      fatherSeg.children = segmentsInter.filter(seg =>
        seg.start >= fatherSeg.start &&
        seg.end <= fatherSeg.end &&
        seg !== fatherSeg &&
        !childrensAux.includes(fatherSeg)
      )
      if (fatherSeg.children.length == 0) return;
      childrens(fatherSeg.children)
      childrensAux = childrensAux.concat(fatherSeg.children)
    })
    return segmentsInter.filter(seg => !childrensAux.includes(seg))
  }

  segments = childrens(segments)

  const formatItem = (segment: LinkedinSegment): React.ReactNode => {
    if (segment.unformated) {
      return (segment.text);
    }
    const index = segment.index;
    if (segment.attributeKindUnion?.bold) {
      return <JobDetailBold key={"bold-"+segment.start+"_"+index}>{segment.text}</JobDetailBold>
    }
    if (segment.attributeKindUnion?.hyperlink) {
      return <JobDetailHyperlink href={segment.attributeKindUnion?.hyperlink.url} key={"hyperlink-"+segment.start+"_"+index}>{segment.text}</JobDetailHyperlink>
    }
    if (segment.attributeKindUnion?.italic) {
      return <JobDetailItalic key={"italic-"+segment.start+"_"+index}>{segment.text}</JobDetailItalic>
    }
    if (segment.attributeKindUnion?.lineBreak) {
      return <JobDetailLineBreak key={"lineBreak-"+segment.start+"_"+index} />
    }
    if (segment.attributeKindUnion?.list && segment.attributeKindUnion?.list.ordered) {
      return <JobDetailListOrdered key={"list-ordered-"+segment.start+"_"+index}>{segment.text}</JobDetailListOrdered>
    }
    if (segment.attributeKindUnion?.list && !segment.attributeKindUnion?.list.ordered) {
      return <JobDetailListUnordered key={"list-disordered-"+segment.start+"_"+index}>{segment.text}</JobDetailListUnordered>
    }
    if (segment.attributeKindUnion?.listItem) {
      return <JobDetailListItem key={"listItem-"+segment.start+"_"+index}>{segment.text}</JobDetailListItem>
    }
    if (segment.attributeKindUnion?.paragraph) {
      return <JobDetailParagraph key={"paragraph-"+segment.start+"_"+index}>{segment.text}</JobDetailParagraph>
    }
    if (segment.attributeKindUnion?.superscript) {
      return <JobDetailSuperscript key={"superscript-"+segment.start+"_"+index}>{segment.text}</JobDetailSuperscript>
    }
    if (segment.attributeKindUnion?.underline) {
      return <JobDetailUnderline key={"underline-"+segment.start+"_"+index}>{segment.text}</JobDetailUnderline>
    }
    return segment.text;
  }

  const textInArrayNode = (textStr: string, childText: string, content: React.ReactNode): React.ReactNode[] => {
    return [textStr.substring(0, textStr.indexOf(childText)), content, textStr.substring(textStr.indexOf(childText) + childText.length)];
  }

  const embededTagContent = (text: React.ReactNode, childText: React.ReactNode, content: React.ReactNode): React.ReactNode => {
    if (typeof text === 'string' && typeof childText === 'string') {
      const textStr = text as string;
      const chieldStr = childText as string;
      return textInArrayNode(textStr, chieldStr, content)
    }
    if (Array.isArray(text) && typeof childText === 'string') {
      const textArr = text as React.ReactNode[];
      const result: React.ReactNode[] = [];

      textArr.forEach(item => {
        if (typeof item === 'string') {
          const itemStr = item as string;
          textInArrayNode(itemStr, childText, content).forEach(item => {
            result.push(item)
          })
        } else {
          result.push(item)
        }

      })

      return result;
    }
    return text;
  }

  const segChield = (segment: LinkedinSegment) => {

    segment.children.forEach(child => {
      if (segment.children.length > 0)
        segChield(child)
      segment.text = embededTagContent(segment.text, child.text, formatItem(child))


    })
  }


  // Process segments into React elements
  segments.forEach(segment => {
    if (segment.children.length > 0)
      segChield(segment)
    processedElements.push(formatItem(segment))
  });


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