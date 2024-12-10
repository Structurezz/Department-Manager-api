export interface JwtPayload {
    username: string;
    sub: number; // Assuming `sub` is the user ID
}
