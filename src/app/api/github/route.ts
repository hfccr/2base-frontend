import { createAppAuth } from "@octokit/auth-app";
import { Octokit, App } from "octokit";
import axios from "axios";




export async function POST() {


  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: 1030549,
      privateKey: process.env.GITHUB_PRIVATE_KEY,
      installationId: 56167712,
      clientId: process.env.GITHUB_CLIENT_ID,

    },
  });
 
  console.log("check token")

  // authenticates as app based on request URLs
  const { data } = await octokit.rest.apps.getAuthenticated();

  // Use optional chaining and a fallback if slug is undefined
  const slug = data?.slug ?? 'default-slug';

  console.log("Authenticated App Slug:", slug);

  // creates an installation access token as needed
  // assumes that installationId 123 belongs to @octocat, otherwise the request will fail
  await octokit.rest.issues.create({
    owner: "hack404base",
    repo: "Base",
    title: "Hello world from " + slug,
  });
}

// Call the async function
//   createIssue().catch((error) => {
//     console.error("Error creating issue:", error);
//   }
// );


// const octokit = new Octokit({
//   authStrategy: createAppAuth,
//   auth: {
//     appId: 1,
//     privateKey: process.env.GITHUB_TOKEN,
//     installationId: 123,
//   },
// });

// // authenticates as app based on request URLs
// const {
//   data: { slug },
// } = await octokit.rest.apps.getAuthenticated();


// await octokit.rest.issues.create({
//   owner: "octocat",
//   repo: "hello-world",
//   title: "Hello world from " + slug,
// });




// import { NextRequest, NextResponse } from "next/server";

// export default async function POST(req: NextRequest) {
//     try {
//         const { username, message } = await req.json();
//         const token = process.env.GITHUB_TOKEN; // Store your GitHub token in an environment variable

//         const owner = username; // Use the username as the owner for the repository
//         const repo = 'your-repo-name'; // Replace with your repository name, or add it to the request body if needed

//         const url = `https://api.github.com/repos/${owner}/${repo}/issues`;

//         const headers = {
//             'Authorization': `token ${token}`,
//             'Accept': 'application/vnd.github.v3+json',
//             'Content-Type': 'application/json'
//         };

//         const issueData = {
//             title: `Issue from ${username}`, // Set a title that includes the username
//             body: message // Use the message as the issue body
//         };

//         const response = await fetch(url, {
//             method: 'POST',
//             headers: headers,
//             body: JSON.stringify(issueData)
//         });

//         if (response.ok) {
//             const issue = await response.json();
//             return NextResponse.json({
//                 status: 200,
//                 message: 'Issue created',
//                 url: issue.html_url
//             });
//         } else {
//             const error = await response.json();
//             return NextResponse.json({
//                 status: response.status,
//                 error: error.message
//             });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return NextResponse.json({
//             status: 500,
//             error: 'Internal Server Error'
//         });
//     }
// }
