export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    user_type: 'trainee' | 'trainer' | 'admin';
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export type UserType = 'trainee' | 'trainer';
export type Gender = 'male' | 'female' | 'other';

export interface RegistrationData extends Omit<User, 'id'> {
    password: string;
    date_of_birth?: string | null;
    gender?: Gender;
    specialization?: string;
    bio?: string;
}
