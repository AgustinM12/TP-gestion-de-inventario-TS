import { NextResponse } from "next/server";

export async function GET() {
    const users = await fetch("http://localhost:4000/api/users")

    const data = await users.json()

    return NextResponse.json(data)
}

export async function POST(request) {
    try {

        const data = await request.json();
        console.log(data);

        const response = await fetch("http://localhost:4000/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const final = await response.json();

        if (final.errors) {
            return NextResponse.json(final, { status: 400 });
        }

        return NextResponse.json(final, { status: 201 });

    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}
