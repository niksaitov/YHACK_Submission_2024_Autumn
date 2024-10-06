'use client'
import React from 'react';
import {
    Box,
    VStack,
    Heading,
    Button,
    Container,
    Icon, Image
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const customColors = {
    background: "#6c5887",
    buttonPrimary: "#FFFFFF",
    buttonSecondary: "#e5c1ea",
    buttonTertiary: "#a796c9",
    text: "#FFFFFF"
};

const LandingPage = () => {
    return (
        <Box bg={customColors.background} minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
            <Container maxW="container.sm">
                <VStack spacing={8} align="stretch">
                    <Heading as="h1" size="2xl" color={customColors.text} textAlign="center" fontWeight="bold">
                        Welcome to
                    </Heading>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Image src="/lrns.jpg" alt="LRNS" width={100} height={100}/>
                    </div>
                    <Heading as="h1" size="3xl" color={customColors.buttonSecondary} textAlign="center"
                             fontWeight="bold"> courselrns </Heading>
                    <VStack spacing={4}>
                        <Button size="lg" width="full" bg={customColors.buttonPrimary}
                                color={customColors.background} _hover={{opacity: 0.9}}
                                onClick={() => window.location.href = '/profile'}
                        >
                            GET STARTED
                        </Button>
                        <Button size="lg" width="full" bg={customColors.buttonSecondary} color={customColors.background}
                                _hover={{opacity: 0.9}}
                                onClick={() => window.location.href = '/about-us'}
                        >
                            ABOUT US
                        </Button>
                        <Button
                            size="lg"
                            width="full"
                            bg={customColors.buttonTertiary}
                            color={customColors.text}
                            _hover={{opacity: 0.9}}
                            onClick={() => window.location.href = 'https://github.com/niksaitov/YHACK_Submission_2024_Autumn'}
                            leftIcon={<Icon as={FaGithub} boxSize={6}/>}
                        >
                            GITHUB
                        </Button>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default LandingPage;