import connectDB from "@/app/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: any) {
    const { firstName,
        lastName,
        dob,
        email,
        phone,
        address,
        username,
        password,
        confPassword} = await req.json();

    if(password!==confPassword){
        return NextResponse.json({msg: "Password and confirmation password should match"})
    }

    try {
        await connectDB();
        await User.create({ firstName,
            lastName,
            dob,
            email,
            phone,
            address,
            username,
            password});

        return NextResponse.json({
        msg: ["Message sent successfully"],
        success: true,
        });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
        let errorList = [];
        for (let e in error.errors) {
            errorList.push(error.errors[e].message);
        }
        console.log(errorList);
        return NextResponse.json({ msg: errorList });
        } else {
        return NextResponse.json({ msg: ["Unable to send message."] });
        }
    }
}