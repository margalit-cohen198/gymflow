import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Button,
    Avatar,
} from '@mui/material';
// import { AccountCircle } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { useSnackbar } from 'notistack';

export const NavBar = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        AuthService.logout();
        setUser(null);
        enqueueSnackbar('התנתקת בהצלחה!', { variant: 'success' });
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/profile');
        handleClose();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    GymFlow
                </Typography>

                {user ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 2 }}>
                            שלום, {user.first_name}
                        </Typography>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>
                                {user.first_name[0]}
                            </Avatar>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleProfile}>הפרופיל שלי</MenuItem>
                            <MenuItem onClick={handleLogout}>התנתקות</MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Box>
                        <Button color="inherit" onClick={() => navigate('/login')}>
                            התחברות
                        </Button>
                        <Button color="inherit" onClick={() => navigate('/register')}>
                            הרשמה
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};
