import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import NavBar from './NavBar';

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar />
            <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
                        {title}
                    </Typography>
                    {children}
                </Paper>
            </Container>
        </Box>
    );
};

export default DashboardLayout;
