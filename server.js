import 'dotenv/config';
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3456;

app.use(express.json());
app.use(express.static(join(__dirname, 'dist')));

// ── API proxy — keeps the Anthropic key server-side ─────────
app.post('/api/narrate', async (req, res) => {
  const { systemPrompt, userPrompt } = req.body;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model:      'claude-opus-4-5',
      max_tokens: 600,
      system:     systemPrompt,
      messages:   [{ role: 'user', content: userPrompt }],
    });

    res.json({ text: message.content[0].text });
  } catch (err) {
    console.error('[/api/narrate]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── SPA fallback — serve index.html for all other routes ────
app.get('/{*path}', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Slurry running on http://localhost:${PORT}`);
});
