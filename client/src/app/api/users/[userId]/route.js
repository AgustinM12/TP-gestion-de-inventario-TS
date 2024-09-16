import { NextResponse } from "next/server";

export function GET(request, { params }) {

    return NextResponse.json({
        message: `Obteniendo usuario ${params.userId}`
    })
}

export function PUT(request, { params }) {

    return NextResponse.json({
        message: `Editando usuario ${params.userId}`
    })
}

export function DELETE(request, { params }) {

    return NextResponse.json({
        message: `Eliminando usuario ${params.userId}`
    })
}