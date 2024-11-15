import { NextRequest, NextResponse } from 'next/server'
import { apiUrl } from 'config';

const baseUrl = `${apiUrl}/teams`;

type Params = Promise<{ id: number }>;
export async function GET(request: NextRequest, context: { params: Params }) {
    const params = await context.params
    const res = await fetch(`${baseUrl}/${params.id}/`, {
        next: { revalidate: 10 },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const result = await res.json()
    return NextResponse.json(result)
}

export async function PUT(request: NextRequest, context: { params: Params }) {
    const body = await request.json()
    const params = await context.params
    const res = await fetch(`${baseUrl}/${params.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    if (!res.ok) {
        // Handle non-2xx responses
        const errorData = await res.json();
        return NextResponse.json(errorData, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data)
}

export async function DELETE(request: NextRequest, context: { params: Params }) {
    const params = await context.params
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

