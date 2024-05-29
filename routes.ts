export const publicRoutes = [  
    "/",
    "/auth/new-verification",
];

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/reset",
];

export const protectedRoutes = [
    "/logged",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/logged/profile";