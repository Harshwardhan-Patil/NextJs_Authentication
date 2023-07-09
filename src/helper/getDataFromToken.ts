import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, status: 500 })
        }
    }
}