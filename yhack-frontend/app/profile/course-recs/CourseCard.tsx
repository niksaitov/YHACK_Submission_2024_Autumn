"use client";
import React from "react";
import { Box, Heading, Text, Flex, Badge } from "@chakra-ui/react";

interface Course {
  courseNumber: string;
  courseTitle: string;
  crn: string;
  department: string;
  description: string;
  distDesg: string;  // Assume distDesg is a string
  meetingPattern: string;  // Assume meetingPattern is a string
  prerequisites: string;
}

interface CourseCardProps {
  course: Course;
}

// Define custom colors
const customColors = {
  cardBackground: "#a796c9",
  cardText: "#333333",
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
  <Box
    bg={customColors.cardBackground}
    p={4}
    borderRadius="md"
    boxShadow="md"
    color={customColors.cardText}
  >
    <Heading color = "#FFFFFF" size="md" mb={2}>
      {course.department} {course.courseNumber}: {course.courseTitle}
    </Heading>
    <Text fontSize="sm" mb={2}>
      {course.description}
    </Text>

    <Flex justify="space-between" align="center" mb={2}>
      {/* Render distDesg only if it's not empty */}
      {course.distDesg && course.distDesg.length > 4 && (
        <Box display="flex" gap={2} mt={2}>
          <Badge colorScheme = "purple" display="flex" gap={2} mt={2}> {course.distDesg.replace(/[\[\]']/g, '')}
        </Badge>
        </Box>
      )}

      {/* Render meeting pattern only if it's not empty and not "HTBA" */}
      {course.meetingPattern && course.meetingPattern.length > 4 && course.meetingPattern !== "HTBA" && (
        <Badge colorScheme = "purple" display="flex" gap={2} mt={2}>  {course.meetingPattern.replace(/[\[\]']/g, '')}
</Badge>
      )}
    </Flex>

    {/* Render prerequisites only if they are not "Value Not Provided" */}
    {course.prerequisites !== "Value Not Provided" && (
      <Text fontSize="sm" fontStyle="italic">
        Prerequisites: {course.prerequisites}
      </Text>
    )}
  </Box>
);

export default CourseCard;
