export interface User {
    uid: string;
    email: string;
    displayName: string;
    firstName: string;
    lastName: string;
    birthDate: string | null;
    cityId: number | null;
    emailVerified: boolean;
}
