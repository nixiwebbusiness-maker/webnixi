export default async function handler(req, res) {
    // Sirf POST requests ki ijazat hai
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { content, sha } = req.body;
    
    // Ye GH_TOKEN aapne Vercel Settings mein add karna hai
    const GITHUB_TOKEN = process.env.GH_TOKEN; 

    if (!GITHUB_TOKEN) {
        return res.status(500).json({ error: 'GitHub Token not configured in Vercel' });
    }

    try {
        const response = await fetch(`https://api.github.com/repos/nixiwebbusiness-maker/lumina-luxe-sage/contents/data.json`, {
            method: "PUT",
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "Live Update via Lumina Admin Panel",
                content: content, // Base64 encoded data
                sha: sha          // File ki current ID
            }),
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to connect to GitHub' });
    }
}
