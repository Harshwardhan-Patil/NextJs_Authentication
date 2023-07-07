import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { SendMail } from "@/helper/mailer";

connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        // check if user is exist or not
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ message: 'User already  exist', status: 400 })
        }
        //hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        await SendMail({ email, emailType: "VERIFY", userId: savedUser.id.toString() })

        return NextResponse.json({
            message: 'User created successfully',
            user: savedUser,
            status: 200,
        })

    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 })
    }
}