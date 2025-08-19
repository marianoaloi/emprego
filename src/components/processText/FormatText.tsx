
import React, {  } from 'react';
import {
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
} from '../JobDescription.styled';
import {
  TextAttribute
} from '@/types/job-description.types';

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



// Cache for formatted content to prevent duplicate processing
const formatCache = new Map<string, React.ReactNode>();

// Function to apply formatting attributes to text
export const formatTextWithAttributes = (text: string, attributes: Record<string, TextAttribute>): React.ReactNode => {
  // Create a cache key based on text and attributes
  const cacheKey = `${text}_${JSON.stringify(attributes)}`;
  
  // Return cached result if available
  if (formatCache.has(cacheKey)) {
    return formatCache.get(cacheKey)!;
  }

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

  const childrens = (segmentsAnalise: LinkedinSegment[]): LinkedinSegment[] => {
    let allSegmentsChieldren: LinkedinSegment[] = [];
    segmentsAnalise.forEach(segmentFather => {
      segmentFather.children = segmentsAnalise.filter(segmentItemFather =>
        segmentItemFather.start >= segmentFather.start &&
        segmentItemFather.end <= segmentFather.end &&
        segmentItemFather !== segmentFather &&
        !allSegmentsChieldren.includes(segmentFather)
      )
      if (segmentFather.children.length == 0) return;
      childrens(segmentFather.children)
      allSegmentsChieldren = allSegmentsChieldren.concat(segmentFather.children)
    })
    return segmentsAnalise.filter(seg => !allSegmentsChieldren.includes(seg))
  }

  segments = childrens(segments)

  let keyCount = 0;
  const formatItem = (segment: LinkedinSegment): React.ReactNode => {
    if (segment.unformated) {
      return (segment.text);
    }
    const index = segment.index;
    if (segment.attributeKindUnion?.bold) {
      return <JobDetailBold key={"bold-"+segment.start+"_"+index+"-"+(keyCount++)}>{segment.text}</JobDetailBold>
    }
    if (segment.attributeKindUnion?.hyperlink) {
      return <JobDetailHyperlink href={segment.attributeKindUnion?.hyperlink.url} key={"hyperlink-"+segment.start+"_"+index+"-"+(keyCount++)}>{segment.text}</JobDetailHyperlink>
    }
    if (segment.attributeKindUnion?.italic) {
      return <JobDetailItalic key={"italic-"+segment.start+"_"+index+"-"+(keyCount++)}>{segment.text}</JobDetailItalic>
    }
    if (segment.attributeKindUnion?.lineBreak) {
      return <JobDetailLineBreak key={"lineBreak-"+segment.start+"_"+index+"-"+(keyCount++)} />
    }
    if (segment.attributeKindUnion?.list && segment.attributeKindUnion?.list.ordered) {
      return <JobDetailListOrdered key={"list-ordered-"+segment.start+"_"+index+"-"+(keyCount++)}>{segment.text}</JobDetailListOrdered>
    }
    if (segment.attributeKindUnion?.list && !segment.attributeKindUnion?.list.ordered) {
      return <JobDetailListUnordered key={"list-disordered-"+segment.start+"_"+index+"-"+(keyCount++)}>{segment.text}</JobDetailListUnordered>
    }
    if (segment.attributeKindUnion?.listItem) {
      return <JobDetailListItem key={"listItem-"+segment.start+"_"+index+"-"+(keyCount++)}>{segment.text}</JobDetailListItem>
    }
    if (segment.attributeKindUnion?.paragraph) {
      return <JobDetailParagraph key={"paragraph-"+segment.start+"_"+index+"-"+(keyCount++)}>{segment.text}</JobDetailParagraph>
    }
    if (segment.attributeKindUnion?.superscript) {
      return <JobDetailSuperscript key={"superscript-"+segment.start+"_"+index+"-"+(keyCount++)}>{segment.text}</JobDetailSuperscript>
    }
    if (segment.attributeKindUnion?.underline) {
      return <JobDetailUnderline key={"underline-"+segment.start+"_"+index+"-"+(keyCount++)}>{segment.text}</JobDetailUnderline>
    }
    return segment.text;
  }

  const textInArrayNode = (textStr: string, childText: string, content: React.ReactNode): React.ReactNode[] => {
    const indexText = textStr.indexOf(childText);
    if (indexText === -1) {
      return [textStr];
    }
    return [textStr.substring(0, indexText), content, textStr.substring(indexText + childText.length)];
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
      if (child.children.length > 0)
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
    formatCache.set(cacheKey, text);
    return text;
  }

  // Cache the result before returning
  formatCache.set(cacheKey, processedElements);
  return processedElements;
};