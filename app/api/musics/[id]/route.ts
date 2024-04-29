import { NextRequest, NextResponse } from 'next/server'
import { apiUrl } from 'config';

const baseUrl = `${apiUrl}/musics`;

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    const res = await fetch(`${baseUrl}/${params.id}/`, {
        next: { revalidate: 10 },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const result = await res.json()
    return NextResponse.json(result)
}

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    const body = await request.json()
    const res = await fetch(`${baseUrl}/${params.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    const data = await res.json();
    return NextResponse.json(data)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    const res = await fetch(`${baseUrl}/${params.id}/`, {
        next: { revalidate: 10 },
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    return NextResponse.json(data)
}

