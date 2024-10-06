// home/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Input, Stack, Text} from '@chakra-ui/react';
import Select from 'react-select';
import Typed from 'typed.js';

// Define custom colors
const customColors = {
    background: "#6c5887",
    text: "#FFFFFF",
    buttonBackground: "#a796c9",
    buttonText: '#FFFFFF',
};


const majorsWithCodes = [
    { code: 'AFAM', name: 'African American Studies' },
    { code: 'AFST', name: 'African Studies' },
    { code: 'AKKD', name: 'Akkadian' },
    { code: 'AMST', name: 'American Studies' },
    { code: 'AMTH', name: 'Applied Mathematics' },
    { code: 'ANTH', name: 'Anthropology' },
    { code: 'APHY', name: 'Applied Physics' },
    { code: 'ARBC', name: 'Arabic' },
    { code: 'ARCG', name: 'Archaeological Studies' },
    { code: 'ARCH', name: 'Architecture' },
    { code: 'ART', name: 'Art' },
    { code: 'ASL', name: 'American Sign Language' },
    { code: 'ASTR', name: 'Astronomy' },
    { code: 'B&BS', name: 'Biological & Biomedical Sciences' },
    { code: 'BENG', name: 'Biomedical Engineering' },
    { code: 'BIOL', name: 'Biology' },
    { code: 'BIS', name: 'Biostatistics' },
    { code: 'BNGL', name: 'Bengali' },
    { code: 'BURM', name: 'Burmese' },
    { code: 'C&MP', name: 'Cell & Molecular Physiology' },
    { code: 'CB&B', name: 'Comp Biol & Biomed Informatics' },
    { code: 'CBIO', name: 'Cell Biology' },
    { code: 'CDE', name: 'Chronic Disease Epidemiology' },
    { code: 'CENG', name: 'Chemical Engineering' },
    { code: 'CGSC', name: 'Cognitive Science' },
    { code: 'CHEM', name: 'Chemistry' },
    { code: 'CHER', name: 'Cherokee' },
    { code: 'CHLD', name: 'Child Study' },
    { code: 'CHNS', name: 'Chinese' },
    { code: 'CLCV', name: 'Classical Civilization' },
    { code: 'CLSS', name: 'Classics' },
    { code: 'CPLT', name: 'Comparative Literature' },
    { code: 'CPSC', name: 'Computer Science' },
    { code: 'CSEC', name: 'Computer Science and Economics' },
    { code: 'CSLI', name: 'Computing and Linguistics' },
    { code: 'CZEC', name: 'Czech' },
    { code: 'DRAM', name: 'Drama' },
    { code: 'DUTC', name: 'Dutch' },
    { code: 'E&EB', name: 'Ecology & Evolutionary Biology' },
    { code: 'E&RS', name: 'European & Russian Studies' },
    { code: 'EALL', name: 'East Asian Lang and Lit' },
    { code: 'EAST', name: 'East Asian Studies' },
    { code: 'ECON', name: 'Economics' },
    { code: 'EDST', name: 'Education Studies' },
    { code: 'EENG', name: 'Electrical Engineering' },
    { code: 'EGYP', name: 'Egyptology' },
    { code: 'EHS', name: 'Environmental Health Sciences' },
    { code: 'ELP', name: 'English Language Program' },
    { code: 'EMD', name: 'Epidemiology Microbial Disease' },
    { code: 'EMST', name: 'Early Modern Studies' },
    { code: 'ENAS', name: 'Engineering & Applied Science' },
    { code: 'ENGL', name: 'English' },
    { code: 'ENRG', name: 'Energy Studies' },
    { code: 'ENV', name: 'Environment' },
    { code: 'ENVE', name: 'Environmental Engineering' },
    { code: 'EP&E', name: 'Ethics, Politics, & Economics' },
    { code: 'EPH', name: 'Epidemiology & Public Health' },
    { code: 'EPS', name: 'Earth and Planetary Sciences' },
    { code: 'ER&M', name: 'Ethnicity, Race, & Migration' },
    { code: 'EVST', name: 'Environmental Studies' },
    { code: 'FILM', name: 'Film & Media Studies' },
    { code: 'FNSH', name: 'Finnish' },
    { code: 'FREN', name: 'French' },
    { code: 'GENE', name: 'Genetics' },
    { code: 'GLBL', name: 'Global Affairs' },
    { code: 'GMAN', name: 'German' },
    { code: 'GREK', name: 'Ancient Greek' },
    { code: 'GSAS', name: 'Graduate School' },
    { code: 'HEBR', name: 'Modern Hebrew' },
    { code: 'HGRN', name: 'Hungarian' },
    { code: 'HIST', name: 'History' },
    { code: 'HLTH', name: 'Health Studies' },
    { code: 'HNDI', name: 'Hindi' },
    { code: 'HPM', name: 'Health Policy and Management' },
    { code: 'HSAR', name: 'History of Art' },
    { code: 'HSCI', name: 'Health Sciences' },
    { code: 'HSHM', name: 'Hist of Science, Hist of Med' },
    { code: 'HUMS', name: 'Humanities' },
    { code: 'IBIO', name: 'Immunobiology' },
    { code: 'IMED', name: 'Investigative Medicine' },
    { code: 'INDN', name: 'Indonesian' },
    { code: 'ITAL', name: 'Italian Studies' },
    { code: 'JAPN', name: 'Japanese' },
    { code: 'JDST', name: 'Jewish Studies' },
    { code: 'KHMR', name: 'Khmer' },
    { code: 'KREN', name: 'Korean' },
    { code: 'LAST', name: 'Latin American Studies' },
    { code: 'LATN', name: 'Latin' },
    { code: 'LAW', name: 'Law' },
    { code: 'LING', name: 'Linguistics' },
    { code: 'LITR', name: 'Literature' },
    { code: 'MATH', name: 'Mathematics' },
    { code: 'MB&B', name: 'Molecular Biophysics & Biochemistry' },
    { code: 'MBIO', name: 'Microbiology' },
    { code: 'MCDB', name: 'Molecular, Cellular & Developmental Biology' },
    { code: 'MDVL', name: 'Medieval Studies' },
    { code: 'MUS', name: 'Music' },
    { code: 'NCC', name: 'Non-Canonical Communities' },
    { code: 'NEUR', name: 'Neuroscience' },
    { code: 'PHIL', name: 'Philosophy' },
    { code: 'PHYS', name: 'Physics' },
    { code: 'PLSC', name: 'Political Science' },
    { code: 'PMCH', name: 'Pharmaceutical Chemistry' },
    { code: 'PSYC', name: 'Psychology' },
    { code: 'RELS', name: 'Religious Studies' },
    { code: 'RUSS', name: 'Russian' },
    { code: 'S&DS', name: 'Statistics & Data Science' },
    { code: 'S&ES', name: 'Soil & Environmental Sciences' },
    { code: 'SAA', name: 'South Asian Arts' },
    { code: 'SART', name: 'Sculpture' },
    { code: 'SCTE', name: 'Secondary Teacher Education' },
    { code: 'SENV', name: 'Sustainable Environment' },
    { code: 'SLA', name: 'Slavic Languages & Literatures' },
    { code: 'SLS', name: 'Sociolinguistics' },
    { code: 'SOCY', name: 'Sociology' },
    { code: 'SOST', name: 'Social Studies' },
    { code: 'SPNL', name: 'Spanish' },
    { code: 'SPLS', name: 'Special Studies' },
    { code: 'SPOC', name: 'Speech Communication' },
    { code: 'SPOT', name: 'Sports Studies' },
    { code: 'STCY', name: 'Studies in the Arts' },
    { code: 'SUSM', name: 'Sustainable Management' },
    { code: 'THST', name: 'Theatre Studies' },
    { code: 'UHL', name: 'University Honors' },
    { code: 'URST', name: 'Urban Studies' },
    { code: 'VMS', name: 'Visual & Media Studies' },
    { code: 'VPA', name: 'Visual & Performing Arts' },
    { code: 'WGS', name: 'Women’s, Gender, and Sexuality Studies' }
];

export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const [selectedMajorCode, setSelectedMajorCode] = useState('');
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [textBubbles, setTextBubbles] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [typingComplete, setTypingComplete] = useState(false);
    const prompts = [
        "Hello! Before we provide you with our recommendations, we need to get to know you a little.",
        "What are you (thinking of) majoring in?",
        "What are you interested in learning about?",
        "Thank you so much! Give us a moment to generate your courses..." // Final prompt
    ];

    useEffect(() => {
        // Load saved data from localStorage
        const savedMajorCode = localStorage.getItem('selectedMajorCode');
        const savedBubbles = localStorage.getItem('textBubbles');

        if (savedMajorCode) {
            setSelectedMajorCode(savedMajorCode);
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
                setTypingComplete(true);
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

    useEffect(() => {
        if (loading && typingComplete) {
            window.location.href = '/profile/course-recs';
        }
    }, [loading, typingComplete]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);


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

    const handleMajorSelect = (selectedOption: { value: string, label: string } | null) => {
        if (selectedOption) {
            setSelectedMajorCode(selectedOption.value);
            setInputValue(''); // Clear input after selection


            // Save the selected major code to localStorage
            localStorage.setItem('selectedMajorCode', selectedOption.value);
        } else {
            setSelectedMajorCode('');
            localStorage.removeItem('selectedMajorCode');
        }
    };

    const handleNextPrompt = () => {

        if (currentPromptIndex === 0) {
            setCurrentPromptIndex(1);
            setTypingComplete(false);
        } else if (currentPromptIndex === 1) {
            if (selectedMajorCode) {
                setCurrentPromptIndex(2);
                setTypingComplete(false);
            }
        } else if (currentPromptIndex === 2) {
            handleAddBubble();
            setCurrentPromptIndex(3);
            setTypingComplete(false);
            setLoading(true); // Start loading when moving to the final prompt
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
        setSelectedMajorCode('');
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
                {typingComplete && currentPromptIndex === 1 && (
                    <Select
                        value={selectedMajorCode ? { value: selectedMajorCode, label: majorsWithCodes.find(m => m.code === selectedMajorCode)?.name || '' } : null}
                        onChange={handleMajorSelect}
                        options={majorsWithCodes.map(major => ({ value: major.code, label: major.name }))}
                        placeholder="Search for your major..."
                        isClearable
                        isSearchable
                        styles={{
                            control: (base) => ({
                                ...base,
                                borderColor: '#a796c9',
                                backgroundColor: 'white',
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: 'black',
                            }),
                            option: (base) => ({
                                ...base,
                                color: 'black',
                            }),
                        }}
                    />
                )}

                {/* Third prompt - Text input for interests */}
                {typingComplete && currentPromptIndex === 2 && (
                    <Stack spacing={2}>
                        <Input
                            placeholder="I'm interested in..."
                            value={inputValue}
                            color={customColors.buttonText}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        <Box mt={4} display="flex" flexWrap="wrap" gap={2}>
                            {textBubbles.map((text, index) => (
                                <Box
                                    key={index}
                                    display="inline-flex"
                                    alignItems="center"
                                    bg="purple.100"
                                    borderRadius="full"
                                    px={4}
                                    py={2}
                                    maxWidth="90%"
                                >
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
                    </Stack>
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
                    Start over
                </Button>
            </Stack>
        </Box>

    )}
</Stack>


{loading && typingComplete && (
    <Text color={customColors.text} mt={2}></Text>
    )}
</Box>
);
}