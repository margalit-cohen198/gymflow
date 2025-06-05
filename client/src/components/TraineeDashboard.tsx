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
    ListItemSecondaryAction,
    IconButton
} from '@mui/material';
import { Event as EventIcon, Edit as EditIcon } from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const TraineeDashboard: React.FC = () => {
    const { user } = useAuth();

    const upcomingWorkouts = [
        { id: 1, date: '2024-01-20', time: '10:00', trainer: 'John Doe', type: 'Personal Training' },
        { id: 2, date: '2024-01-22', time: '15:30', trainer: 'Jane Smith', type: 'Group Class' },
    ];

    return (
        <DashboardLayout title={`ברוך הבא, ${user?.first_name}`}>
            <Grid container spacing={3}>
                {/* Quick Actions */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                פעולות מהירות
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<EventIcon />}
                                sx={{ mr: 2, mb: 1 }}
                            >
                                קבע אימון חדש
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Upcoming Workouts */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                אימונים קרובים
                            </Typography>
                            <List>
                                {upcomingWorkouts.map((workout) => (
                                    <ListItem key={workout.id} divider>
                                        <ListItemText
                                            primary={`${workout.type} with ${workout.trainer}`}
                                            secondary={`${workout.date} at ${workout.time}`}
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

                {/* Progress Summary */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                סיכום התקדמות
                            </Typography>
                            <Typography variant="body1">
                                אימונים שהושלמו החודש: 8
                            </Typography>
                            <Typography variant="body1">
                                יעד חודשי: 12 אימונים
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default TraineeDashboard;
