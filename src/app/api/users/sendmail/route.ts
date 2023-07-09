import { NextResponse, NextRequest } from "next/server";
import { SendMail } from "@/helper/mailer";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 403 })
        }
        await SendMail({ email, emailType: "RESET", userId: user.id })
        return NextResponse.json({ message: 'Email Send Successfully', success: true }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
    }
}