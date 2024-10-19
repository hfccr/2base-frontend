import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
    try {
        const { instagramId, message } = await req.json();
        const token = process.env.INSTAGRAM_TOKEN; // Store your Instagram token in an environment variable

        const url = `https://graph.instagram.com/v13.0/${instagramId}/messages`; // This endpoint is hypothetical; replace with actual API details.

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const body = {
            recipient: { id: instagramId },
            message: { text: message }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json({
                status: 200,
                message: 'Message sent successfully',
                data
            });
        } else {
            const error = await response.json();
            return NextResponse.json({
                status: response.status,
                error: error.message
            });
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            status: 500,
            error: 'Internal Server Error'
        });
    }
}
