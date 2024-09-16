import { NextResponse } from "next/server";

export function get_users() {
    return NextResponse.json({
        message: "Hello world"
    })
}