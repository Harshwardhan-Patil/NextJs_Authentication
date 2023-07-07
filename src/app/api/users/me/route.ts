import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {

    try {
        const id = await getDataFromToken(request);
        const userData = await User.findById(id).select('-password');

        return NextResponse.json({
            message: 'User Found',
            data: userData
        })
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json(error.message)
    }
}
