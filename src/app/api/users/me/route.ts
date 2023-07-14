import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
import { getDataFromToken } from "@/helper/getDataFromToken";


connect();

export const revalidate = 0;

export async function GET(request: NextRequest) {

    try {
        const id = await getDataFromToken(request);
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
