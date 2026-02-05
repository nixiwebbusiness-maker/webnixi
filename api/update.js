export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { content, sha } = req.body;
    const GITHUB_TOKEN = process.env.GH_TOKEN;

    if (!GITHUB_TOKEN) return res.status(500).json({ error: 'GH_TOKEN is missing' });

    try {
        const response = await fetch(`https://api.github.com/repos/nixiwebbusiness-maker/lumina-luxe-sage/contents/data.json`, {
            method: "PUT",
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "Update",
                content: content,
                sha: sha
            }),
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed' });
    }
}
