// app/layout.tsx
'use client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import { ReactNode } from 'react';

// Define custom fonts
import '@fontsource/sanchez/400.css'; // Regular
import '@fontsource/league-spartan/700.css'; // Bold
const theme = extendTheme({
    fonts: {
        heading: "'League Spartan', sans-serif",
        body: "'Sanchez', serif",
    },
});
const GlobalStyles = css`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
        <head></head>
        <body>
        <ChakraProvider theme={theme}>
            <Global styles={GlobalStyles} />
            {children}
        </ChakraProvider>
        </body>
        </html>
    );
}
