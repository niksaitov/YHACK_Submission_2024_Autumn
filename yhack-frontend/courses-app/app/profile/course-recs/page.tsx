'use client'
import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Text, Spinner, Flex, SimpleGrid } from '@chakra-ui/react';
import Link from 'next/link';
import CourseCard from './CourseCard';

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

// Define custom colors
const customColors = {
    background: "#6c5887",
    text: "#FFFFFF",
};

// Sample course data (replace this with your actual data fetching logic)
const sampleCourses: Course[] = [
    {
        courseNumber: 'CPSC 100',
        courseTitle: 'Introduction to Computing',
        crn: '12345',
        department: 'Computer Science',
        description: 'An introduction to the fundamental concepts of computing and programming.',
        distDesg: 'QR',
        meetingPattern: 'MWF 10:00-10:50',
        prerequisites: 'None',
    },
    {
        courseNumber: 'ENGL 120',
        courseTitle: 'Reading and Writing the Modern Essay',
        crn: '23456',
        department: 'English',
        description: 'A study of the modern essay, with emphasis on writing techniques and analysis.',
        distDesg: 'WR',
        meetingPattern: 'TTh 13:00-14:15',
        prerequisites: 'ENGL 114 or equivalent',
    },
    // Add more sample courses as needed
];

const CourseRecommendations: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        // Simulating data fetching
        setTimeout(() => {
            setCourses(sampleCourses);
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <Box
            padding={4}
            bg={customColors.background}
            minHeight="100vh"
        >
            <Heading color={customColors.text} mb={6} textAlign="center">
                Your future schedule...
            </Heading>

            {loading ? (
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    height="50vh"
                    width="100%"
                >
                    <Spinner size="xl" color="white" />
                    <Text color={customColors.text} mt={4} textAlign="center">
                        Loading your course recommendations...
                    </Text>
                </Flex>
            ) : (
                <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
                    {courses.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </SimpleGrid>
            )}

            <Flex justify="center" mt={8}>
                <Link href="/" passHref>
                    <Button
                        as="button" // Change here to avoid nesting <a> elements
                        colorScheme="purple"
                        bg="#a796c9"
                        color="#333333"
                        _hover={{ opacity: 0.8 }}
                        onClick={() => window.location.href = '/'} // Use onClick for navigation
                    >
                        Back to Home
                    </Button>
                </Link>
            </Flex>
        </Box>
    );
}

export default CourseRecommendations;
