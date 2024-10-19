import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
    try {
        const { username, message } = await req.json();
        const token = process.env.GITHUB_TOKEN; // Store your GitHub token in an environment variable

        const owner = username; // Use the username as the owner for the repository
        const repo = 'your-repo-name'; // Replace with your repository name, or add it to the request body if needed

        const url = `https://api.github.com/repos/${owner}/${repo}/issues`;

        const headers = {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        };

        const issueData = {
            title: `Issue from ${username}`, // Set a title that includes the username
            body: message // Use the message as the issue body
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(issueData)
        });

        if (response.ok) {
            const issue = await response.json();
            return NextResponse.json({
                status: 200,
                message: 'Issue created',
                url: issue.html_url
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
