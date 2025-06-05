import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    MenuItem,
    Paper,
    Slide,
    Fade,
    Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { he } from 'date-fns/locale';
import { AuthService } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { UserType, Gender } from '../types/user';

const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('שם פרטי הוא שדה חובה'),
    last_name: Yup.string().required('שם משפחה הוא שדה חובה'),
    email: Yup.string().email('כתובת אימייל לא תקינה').required('אימייל הוא שדה חובה'),
    password: Yup.string()
        .min(6, 'הסיסמה חייבת להכיל לפחות 6 תווים')
        .required('סיסמה היא שדה חובה'),
    phone_number: Yup.string().required('מספר טלפון הוא שדה חובה'),
    user_type: Yup.string().oneOf(['trainee', 'trainer']).required('סוג משתמש הוא שדה חובה'),
    date_of_birth: Yup.mixed().when('user_type', {
        is: 'trainee',
        then: () => Yup.date().nullable().required('תאריך לידה הוא שדה חובה למתאמנים')
    }),
    gender: Yup.mixed().when('user_type', {
        is: 'trainee',
        then: () => Yup.string().required('מין הוא שדה חובה למתאמנים').oneOf(['male', 'female', 'other'])
    }),
    specialization: Yup.mixed().when('user_type', {
        is: 'trainer',
        then: () => Yup.string().required('תחום התמחות הוא שדה חובה למאמנים')
    })
});

export const RegisterForm = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [animate, setAnimate] = useState(true);

    interface FormValues {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        phone_number: string;
        user_type: UserType;
        date_of_birth: Date | null;
        gender: Gender | '';
        specialization: string;
        bio: string;
    }

    const formik = useFormik<FormValues>({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone_number: '',
            user_type: 'trainee',
            date_of_birth: null,
            gender: '',
            specialization: '',
            bio: ''
        },
        validationSchema,
        onSubmit: async (values: FormValues) => {
            try {
                // המר את התאריך לפורמט המתאים ובדוק את המגדר
                const registrationData = {
                    ...values,
                    date_of_birth: values.date_of_birth ? values.date_of_birth.toISOString().split('T')[0] : undefined,
                    gender: values.gender || undefined
                };
                const response = await AuthService.register(registrationData);
                AuthService.setAuthToken(response.token);
                setUser(response.user);
                enqueueSnackbar('ההרשמה בוצעה בהצלחה!', { variant: 'success' });
                navigate('/dashboard');
            } catch (error) {
                console.error('Registration failed:', error);
                enqueueSnackbar('ההרשמה נכשלה. אנא נסה שנית.', { variant: 'error' });
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
                            הרשמה
                        </Typography>
                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="שם פרטי"
                                name="first_name"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                helperText={formik.touched.first_name && formik.errors.first_name}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="שם משפחה"
                                name="last_name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                helperText={formik.touched.last_name && formik.errors.last_name}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="אימייל"
                                name="email"
                                type="email"
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
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="מספר טלפון"
                                name="phone_number"
                                value={formik.values.phone_number}
                                onChange={formik.handleChange}
                                error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                helperText={formik.touched.phone_number && formik.errors.phone_number}
                            />
                            
                            <FormControl component="fieldset" margin="normal" fullWidth>
                                <FormLabel component="legend">סוג משתמש</FormLabel>
                                <RadioGroup
                                    row
                                    name="user_type"
                                    value={formik.values.user_type}
                                    onChange={formik.handleChange}
                                >
                                    <FormControlLabel
                                        value="trainee"
                                        control={<Radio />}
                                        label="מתאמן"
                                    />
                                    <FormControlLabel
                                        value="trainer"
                                        control={<Radio />}
                                        label="מאמן"
                                    />
                                </RadioGroup>
                            </FormControl>

                            {/* שדות נוספים למתאמן */}
                            <Slide direction="right" in={formik.values.user_type === 'trainee'} mountOnEnter unmountOnExit>
                                <Box>                                    <FormControl fullWidth margin="normal">
                                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
                                            <DatePicker
                                                label="תאריך לידה"
                                                value={formik.values.date_of_birth}
                                                onChange={(value) => formik.setFieldValue('date_of_birth', value)}
                                                slotProps={{
                                                    textField: {
                                                        error: formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth),
                                                        helperText: formik.touched.date_of_birth && formik.errors.date_of_birth
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="מין"
                                        name="gender"
                                        select
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                                        helperText={formik.touched.gender && formik.errors.gender}
                                    >
                                        <MenuItem value="male">זכר</MenuItem>
                                        <MenuItem value="female">נקבה</MenuItem>
                                        <MenuItem value="other">אחר</MenuItem>
                                    </TextField>
                                </Box>
                            </Slide>

                            {/* שדות נוספים למאמן */}
                            <Slide direction="left" in={formik.values.user_type === 'trainer'} mountOnEnter unmountOnExit>
                                <Box>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="תחום התמחות"
                                        name="specialization"
                                        value={formik.values.specialization}
                                        onChange={formik.handleChange}
                                        error={formik.touched.specialization && Boolean(formik.errors.specialization)}
                                        helperText={formik.touched.specialization && formik.errors.specialization}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="קצת על עצמך"
                                        name="bio"
                                        multiline
                                        rows={4}
                                        value={formik.values.bio}
                                        onChange={formik.handleChange}
                                    />
                                </Box>
                            </Slide>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                הרשמה
                            </Button>
                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Link component={RouterLink} to="/login" variant="body2">
                                    יש לך כבר חשבון? לחץ להתחברות
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Fade>
    );
};
