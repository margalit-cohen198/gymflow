import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Link,
    Paper,
    Fade,
    Divider
} from '@mui/material';
import { AuthService } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('כתובת אימייל לא תקינה')
        .required('אימייל הוא שדה חובה'),
    password: Yup.string()
        .required('סיסמה היא שדה חובה')
});

export const LoginForm = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [animate, setAnimate] = useState(true);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await AuthService.login(values);
                AuthService.setAuthToken(response.token);
                setUser(response.user);
                enqueueSnackbar('התחברת בהצלחה!', { variant: 'success' });
                navigate('/dashboard');
            } catch (error) {
                console.error('Login failed:', error);
                enqueueSnackbar('ההתחברות נכשלה. אנא בדוק את פרטי ההתחברות.', { 
                    variant: 'error',
                    autoHideDuration: 4000
                });
            }
        }
    });

    return (
        <Fade in={animate}>
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Typography component="h1" variant="h5" gutterBottom>
                            התחברות למערכת
                        </Typography>
                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, width: '100%' }}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="אימייל"
                                name="email"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="סיסמה"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                התחברות
                            </Button>
                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Link component={RouterLink} to="/register" variant="body2">
                                    אין לך חשבון? לחץ להרשמה
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Fade>
    );
};
