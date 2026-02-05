export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { content, sha, token } = req.body;

    // GitHub API ko request bhejna file update karne ke liye
    const response = await fetch(`https://api.github.com/repos/nixiwebbusiness-maker/lumina-luxe-sage/contents/data.json`, {
        method: "PUT",
        headers: {
            "Authorization": `token ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: "Admin: Website Update via Lumina Panel",
            content: content, // Base64 encoded content
            sha: sha
        }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
}
