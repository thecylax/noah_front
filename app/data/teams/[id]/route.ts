import { NextRequest, NextResponse } from 'next/server'
import { apiUrl } from 'config';

const baseUrl = `${apiUrl}/teams`;

// type Params = Promise<{ id: number }>;
type Params = { id: number };
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

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params;
    const body = await request.json();

    console.log('ID:', id);
    console.log('Body:', body);

    // Simulação de resposta
    return NextResponse.json({ message: 'PUT executado com sucesso', id, body });
}
// export async function PUT(request: NextRequest, context: { params: Params }) {
//     console.log('----- body ----');
//     const body = await request.json()
//     console.log(body);
//     const { id } = context.params
//     console.log('----- PUT ---- in ' + `${baseUrl}/${id}/`);
//     const res = await fetch(`${baseUrl}/${id}/`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//     })
//     if (!res.ok) {
//         // Handle non-2xx responses
//         const errorData = await res.json();
//         return NextResponse.json(errorData, { status: res.status });
//     }

//     const data = await res.json();
//     return NextResponse.json(data)
// }

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

