import { Role } from '@prisma/client';
import { Request } from 'express';

// Auth Types

export type JWTPayload = { userId: number, role: Role };

export type RequestAuthData = { userId?: number, userRole?: Role };

export type AuthenticatedRequest = Request & RequestAuthData;
