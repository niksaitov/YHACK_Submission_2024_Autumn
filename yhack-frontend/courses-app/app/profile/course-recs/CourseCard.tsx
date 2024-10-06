'use client'
import React from 'react';
import { Box, Heading, Text, Flex, Badge } from '@chakra-ui/react';

interface Course {
    courseNumber: string;
    courseTitle: string;
    crn: string;
    department: string;
    description: string;
    distDesg: string;
    meetingPattern: string;
    prerequisites: string;
}

interface CourseCardProps {
    course: Course;
}

// Define custom colors
const customColors = {
    cardBackground: "#a796c9",
    cardText: '#333333',
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
    <Box
        bg={customColors.cardBackground}
        p={4}
        borderRadius="md"
        boxShadow="md"
        color={customColors.cardText}
    >
        <Heading size="md" mb={2}>{course.courseNumber}: {course.courseTitle}</Heading>
        <Text fontSize="sm" mb={2}>{course.description}</Text>
        <Flex justify="space-between" align="center" mb={2}>
            <Badge colorScheme="purple">{course.distDesg}</Badge>
            <Text fontSize="sm">{course.meetingPattern}</Text>
        </Flex>
        <Text fontSize="sm" fontStyle="italic">Prerequisites: {course.prerequisites}</Text>
    </Box>
);

export default CourseCard;
