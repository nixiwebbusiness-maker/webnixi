export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { content, sha } = req.body;
    const GITHUB_TOKEN = process.env.GH_TOKEN;
    // Sahi Repo Path: lumina-luxe
    const REPO_PATH = 'nixiwebbusiness-maker/lumina-luxe'; 

    try {
        const response = await fetch(`https://api.github.com/repos/${REPO_PATH}/contents/data.json`, {
            method: "PUT",
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "Site content updated via Admin Panel",
                content: content,
                sha: sha
            }),
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
