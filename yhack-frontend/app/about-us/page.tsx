'use client';
import React from 'react';
import { Box, Heading, Text, Flex, Button, SimpleGrid, Image } from '@chakra-ui/react';
import Link from 'next/link';
import {FaGithub} from "react-icons/fa";

// Define custom colors
const customColors = {
    background: "#6c5887",
    text: "#FFFFFF",
    cardBackground: "#a796c9",
    cardText: '#333333',
};

const Card = ({ header, bio, favoriteClass, githubUrl }: { header: string; bio: string; favoriteClass: string; githubUrl: string }) => (
    <Box
        bg={customColors.cardBackground}
        p={4}
        borderRadius="md"
        boxShadow="md"
        color={customColors.cardText}
        textAlign="center"
        height="250px" // Increased height to accommodate the button
    >
        <Heading colorScheme="purple" size="lg" mb={2}>{header}</Heading>
        <Text fontSize="md" mb={4}>{bio}</Text>
        <Text fontSize="sm" fontWeight="bold">Favorite Class:</Text>
        <Text fontSize="sm" mb={4}>{favoriteClass}</Text>
        <Link href={githubUrl} passHref>
            <Button
                colorScheme="purple"
                variant="outline"
                leftIcon={<FaGithub />}
                mt={2}
            >
                Connect with {header.split(': ')[1]} {/* Extracts name from header */}
            </Button>
        </Link>
    </Box>
);

const AboutUs = () => {
    return (
        <Box
            padding={4}
            bg={customColors.background}
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Image src="/lrns.jpg" alt="LRNS" />
            <Heading color={customColors.text} mb={6}>
               Meet the team behind courselrns!
            </Heading>

            <SimpleGrid columns={[1, null, 2]} spacing={6} mb={8}>
                <Card
                    header="L: Lena Qian"

                    bio="Lena likes food. Lena likes Gordon Ramsay. Lena hopes you have a great day."
                    favoriteClass="CPSC 323"
                    githubUrl="https://github.com/lenaqian"


                />
                <Card
                    header="R: Raymond Hou"
                    bio="ChatGPT says Raymond is a data enthusiast. Raymond says it's pronounced ho."
                    favoriteClass="CPSC 323"
                    githubUrl="https://github.com/lenaqian"

                />
                <Card
                    header="N: Nikita Saitov"
                    bio="Nikita likes cats and strategy games. He will also beat you at table tennis."
                    favoriteClass="CPSC 323"
                    githubUrl="https://github.com/niksaitov"

                />
                <Card
                    header="S: Samhita Kumar"
                    bio="Samhita wants to talk to YOU about the United States Constitution."
                    favoriteClass="CPSC 323"
                    githubUrl="https://github.com/samhitask"
                />
            </SimpleGrid>

            <Flex justify="center" mt={8}>
                <Link href="/" passHref>
                    <Button
                        as="button"
                        colorScheme="purple"
                        bg={customColors.cardBackground}
                        color={customColors.cardText}
                        _hover={{ opacity: 0.8 }}
                    >
                        Back to Home
                    </Button>
                </Link>
            </Flex>
        </Box>
    );
};
export default AboutUs;
