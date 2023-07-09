import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User does not exist' }, { status: 404 })
        }

        if (!user.isVerified) {
            return NextResponse.json({ message: 'User is not verified' }, { status: 404 })
        }
        //check password is correct or not
        const result = await bcryptjs.compare(password, user.password)

        if (!result)
            return NextResponse.json({ message: 'Invalid Password' }, { status: 401 })

        const tokeData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokeData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: 'Logged Successfully',
            success: true,
        }, { status: 200 })

        response.cookies.set('token', token, { httpOnly: true })
        return response;

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}