const express = require("express");
const path = require("path");
const https = require("https");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/report", (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not set on the server." });
  }

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Missing prompt." });

  const body = JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    tools: [
      {
        type: "web_search_20250305",
        name: "web_search"
      }
    ],
    messages: [{ role: "user", content: prompt }],
  });

  const options = {
    hostname: "api.anthropic.com",
    path: "/v1/messages",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-beta": "web-search-2025-03-05",
    },
  };

  const request = https.request(options, (response) => {
    let data = "";
    response.on("data", (chunk) => { data += chunk; });
    response.on("end", () => {
      try {
        const parsed = JSON.parse(data);
        if (response.statusCode !== 200) {
          return res.status(response.statusCode).json({ error: parsed.error?.message || "Anthropic API error" });
        }
        // Extract all text blocks (Claude may search then respond)
        const text = parsed.content
          .filter(b => b.type === "text")
          .map(b => b.text)
          .join("");
        res.json({ text });
      } catch (e) {
        res.status(500).json({ error: "Failed to parse API response: " + e.message });
      }
    });
  });

  request.on("error", (e) => {
    res.status(500).json({ error: e.message });
  });

  request.write(body);
  request.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Family Travel Wizard running on port ${PORT}`));
