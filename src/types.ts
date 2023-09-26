import { Request } from 'express';

// Auth Types

export type JWTPayload = { userId: number };

export type AuthenticatedRequest = Request & { userId?: number };
