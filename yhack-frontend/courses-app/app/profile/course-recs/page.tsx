'use client'
import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Text, Spinner, Flex, SimpleGrid } from '@chakra-ui/react';
import Link from 'next/link';
import CourseCard from './CourseCard';
import axios from 'axios';

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

const CourseRecommendations: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string | null>(null); // State for error messages

    useEffect(() => {
        const selectedMajorCode = localStorage.getItem('selectedMajorCode');
        const textBubbles = JSON.parse(localStorage.getItem('textBubbles') || '[]');

        // Condense textBubbles into a single string
        const query = textBubbles.join(', '); // Join interests as a query
        const department = selectedMajorCode || ''; // Use selected major code as department

        // Make the Axios request
        axios.get('http://localhost:5000/search', {
            params: {
                query,
                department
            }
        })
            .then(response => {
                setCourses(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('There was an error!', err);
                setError('Failed to fetch course recommendations.'); // Set error message
                setLoading(false);
            });
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
            ) : error ? (
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    height="50vh"
                    width="100%"
                >
                    <Text color={customColors.text} mt={4} textAlign="center">
                        {error}
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
                        as="button" 
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
