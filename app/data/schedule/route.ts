import { NextRequest, NextResponse } from 'next/server'
import { apiUrl } from 'config';

const baseUrl = `${apiUrl}/schedule/`;

export async function GET() {
    const res = await fetch(`${baseUrl}?limit=15`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const result = await res.json()
    return NextResponse.json({ result })
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data)
}
