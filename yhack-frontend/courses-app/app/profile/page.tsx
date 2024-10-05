// home/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Input, Stack, Text, Select } from '@chakra-ui/react';
import Typed from 'typed.js';

// Define custom colors
const customColors = {
    background: "#6c5887",
    text: "#FFFFFF",
    buttonBackground: "#a796c9",
    buttonText: '#FFFFFF',
};

// Define major options
const majorOptions = ['Computer Science', 'Political Science', 'Philosophy', 'Math', 'Linguistics'];

export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const [textBubbles, setTextBubbles] = useState<string[]>([]);
    const [selectedMajor, setSelectedMajor] = useState('');
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false); // State for showing the next button

    const prompts = [
        "Hello! Before we provide you with our recommendations, we need to get to know you a little.",
        "What are you (thinking of) majoring in?",
        "What are you interested in learning about?",
        "Thank you so much! Give us a moment to generate your courses..." // Final prompt
    ];

    useEffect(() => {
        // Load saved data from localStorage
        const savedMajor = localStorage.getItem('selectedMajor');
        const savedBubbles = localStorage.getItem('textBubbles');

        if (savedMajor) {
            setSelectedMajor(savedMajor);
        }

        if (savedBubbles) {
            setTextBubbles(JSON.parse(savedBubbles));
        }

        setShowNextButton(false); // Hide the button initially

        const typedOptions = {
            strings: [prompts[currentPromptIndex]],
            typeSpeed: 50,
            showCursor: false,
            onComplete: () => {
                setShowNextButton(true); // Show the button after typing completes
            },
        };

        // Initialize Typed.js
        const typed = new Typed('.typed', typedOptions);

        return () => {
            // Destroy the instance on cleanup
            typed.destroy();
        };
    }, [currentPromptIndex]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAddBubble = () => {
        if (inputValue) {
            const updatedBubbles = [...textBubbles, inputValue];
            setTextBubbles(updatedBubbles);
            setInputValue(''); // Clear the input after adding

            // Save bubbles to localStorage
            localStorage.setItem('textBubbles', JSON.stringify(updatedBubbles));
        }
    };

    const handleRemoveBubble = (index: number) => {
        const updatedBubbles = textBubbles.filter((_, i) => i !== index);
        setTextBubbles(updatedBubbles);

        // Save updated bubbles to localStorage
        localStorage.setItem('textBubbles', JSON.stringify(updatedBubbles));
    };

    const handleMajorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const major = event.target.value;
        setSelectedMajor(major);

        // Save major to localStorage
        localStorage.setItem('selectedMajor', major);
    };

    const handleNextPrompt = () => {
        // Move to the next prompt
        if (currentPromptIndex === 0) {
            setCurrentPromptIndex(1);
        } else if (currentPromptIndex === 1) {
            if (selectedMajor) {
                setCurrentPromptIndex(2);
            }
        } else if (currentPromptIndex === 2) {
            handleAddBubble();
            setCurrentPromptIndex(3); // Transition to final prompt
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (currentPromptIndex === 2) {
                handleAddBubble(); // Add interest bubble when on the third prompt
            } else {
                handleNextPrompt(); // Handle Enter key press for other prompts
            }
        }
    };

    const handleRefresh = () => {
        // Clear localStorage
        localStorage.removeItem('selectedMajor');
        localStorage.removeItem('textBubbles');

        // Reset state
        setSelectedMajor('');
        setTextBubbles([]);
        setInputValue('');
        setCurrentPromptIndex(0);
    };

    return (
        <Box
            padding={4}
            bg={customColors.background}
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Heading color={customColors.text}>
                Time to <span style={{ color: "#a796c9" }}>lock in</span>!
            </Heading>
            <Stack spacing={3} width="100%" maxWidth="500px">
                {/* Displaying the current prompt with typing effect */}
                <Text className="typed" color={customColors.text} />

                {/* Second prompt - Dropdown for majors */}
                {currentPromptIndex === 1 && (
                    <Select
                        onChange={handleMajorChange}
                        value={selectedMajor}
                        placeholder="Select your major"
                        variant="outline"
                        mb={4}
                        borderColor="#a796c9" // Light purple outline
                        color="white" // White text
                    >
                        {majorOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </Select>
                )}

                {/* Third prompt - Text input for interests */}
                {currentPromptIndex === 2 && (
                    <Input
                        placeholder="I'm interested in..."
                        value={inputValue}
                        color={customColors.buttonText}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                )}

                {/* Show Next button if the typing is complete */}
                {showNextButton && currentPromptIndex !== 3 && (
                    <Box width="100%" maxWidth="500px" mt={4}>
                        <Stack spacing={2}>
                            <Button
                                onClick={handleNextPrompt}
                                colorScheme="purple"
                                bg={customColors.buttonBackground}
                                color={customColors.buttonText}
                                opacity={0.5}
                                _hover={{ opacity: 0.7 }}
                                width="100%" // Make button full width
                            >
                                Next
                            </Button>
                            <Button
                                onClick={handleRefresh}
                                colorScheme="purple"
                                color={customColors.buttonText}
                                bg={customColors.buttonBackground}
                                opacity={0.5}
                                _hover={{ opacity: 0.7 }}
                                width="100%" // Make button full width
                            >
                                Refresh Form
                            </Button>
                        </Stack>
                    </Box>

                )}
            </Stack>

            {/* Bubbles section */}
            {currentPromptIndex === 2 && (
                <Box mt={4} display="flex" flexWrap="wrap" gap={2}>
                    {textBubbles.map((text, index) => (
                        <Box key={index} display="inline-flex" alignItems="center" bg="purple.100" borderRadius="full" px={4} py={2} maxWidth="0%">
                            {text}
                            <Button
                                onClick={() => handleRemoveBubble(index)}
                                size="xs"
                                colorScheme="white"
                                variant="outline"
                                borderRadius="full"
                                ml={2}
                            >
                                X
                            </Button>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}
