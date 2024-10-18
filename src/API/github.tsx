import { baseSepolia } from "viem/chains";

export default async function handler(req:any, res:any) {
    if (req.method === 'POST') {
        const { username, message } = req.body; // Change here: taking username and message
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

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(issueData)
            });

            if (response.ok) {
                const issue = await response.json();
                res.status(201).json({ message: 'Issue created', url: issue.html_url });
            } else {
                const error = await response.json();
                res.status(response.status).json({ error: error.message });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}