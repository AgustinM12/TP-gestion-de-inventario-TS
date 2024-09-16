import { NextResponse } from "next/server";

export function GET() {
    

    return NextResponse.json({
        message: "Obteniendo usuarios"
    })
}

export function POST() {
    return NextResponse.json({
        message: "Creando usuario"
    })
}