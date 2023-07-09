import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json();

        if (!token) {
            return NextResponse.json({ message: "Token is missing" }, { status: 403 })
        }
        const user = await User.findOne({ forgotPasswordToken: token });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 403 })
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: 'Password Changed Successfully' }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
    }

}