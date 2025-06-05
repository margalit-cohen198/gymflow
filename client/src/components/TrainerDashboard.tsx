import React from 'react';
import { 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    ListItemSecondaryAction,
    IconButton,
    Box
} from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import { 
    Person as PersonIcon, 
    Add as AddIcon,
    Edit as EditIcon,
    CalendarToday as CalendarIcon 
} from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const TrainerDashboard: React.FC = () => {
    const { user } = useAuth();

    const todaySessions = [
        { id: 1, time: '10:00', client: 'דוד כהן', type: 'אימון אישי' },
        { id: 2, time: '15:30', client: 'שרה לוי', type: 'אימון זוגי' },
    ];

    const upcomingClients = [
        { id: 1, name: 'רחל גולדברג', nextSession: '2024-01-21' },
        { id: 2, name: 'יוסי מזרחי', nextSession: '2024-01-22' },
        { id: 3, name: 'מיכל אברהם', nextSession: '2024-01-23' },
    ];

    return (
        <DashboardLayout title={`שלום ${user?.first_name}`}>            <Grid container spacing={3} component="div">
                {/* Quick Actions */}
                <Grid item xs={12} md={6} component="div">
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                פעולות מהירות
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                sx={{ mr: 2, mb: 1 }}
                            >
                                הוסף מתאמן חדש
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<CalendarIcon />}
                                sx={{ mb: 1 }}
                            >
                                קבע אימון חדש
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Today's Schedule */}                <Grid item xs={12} md={6} component="div">
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                אימונים להיום
                            </Typography>
                            <List>
                                {todaySessions.map((session) => (
                                    <ListItem key={session.id} divider>
                                        <ListItemText
                                            primary={`${session.time} - ${session.client}`}
                                            secondary={session.type}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="edit">
                                                <EditIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Client List */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                מתאמנים פעילים
                            </Typography>
                            <List>
                                {upcomingClients.map((client) => (
                                    <ListItem key={client.id} divider>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={client.name}
                                            secondary={`אימון הבא: ${client.nextSession}`}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="edit">
                                                <EditIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Statistics */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                סטטיסטיקות
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="h4" align="center">
                                        15
                                    </Typography>
                                    <Typography variant="body2" align="center">
                                        מתאמנים פעילים
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="h4" align="center">
                                        45
                                    </Typography>
                                    <Typography variant="body2" align="center">
                                        אימונים החודש
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="h4" align="center">
                                        95%
                                    </Typography>
                                    <Typography variant="body2" align="center">
                                        אחוז נוכחות
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default TrainerDashboard;
