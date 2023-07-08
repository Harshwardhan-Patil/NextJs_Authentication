import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {

    try {
        const id = await getDataFromToken(request);
        console.log(id);
        const user = await User.findOne({ _id: id }).select('-password');
        console.log(user);
        return NextResponse.json({
            message: 'User Found',
            data: user,
            id: id
        })
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json(error.message)
    }
}
