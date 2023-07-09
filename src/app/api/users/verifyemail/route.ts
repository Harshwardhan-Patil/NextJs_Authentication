import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();
        //find user using token
        const user = await User.findOne({ verifyToken: token });
        //check user is present or not
        if (!user) {
            return NextResponse.json({ message: 'Invalid Token' }, { status: 401 })
        }

        //verify and reset verifyEmailToken and Expiry and save it
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();


        return NextResponse.json({ message: 'Email verified Successfully', success: true }, { status: 200 })
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ message: error.message }, { status: 500 })
    }


}