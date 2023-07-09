'use server'
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';


connect();

export async function GET(request: NextRequest) {

    try {
        const token = cookies().get('token')?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const id = decodedToken.id;
        if (mongoose.isValidObjectId(id)) {
            const user = await User.findById(id).select('-password');
            const response = NextResponse.json({
                message: 'User Found',
                user,
            }, { status: 200 })
            return response;
        }
        return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
