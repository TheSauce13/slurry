import { defineConfig } from 'vite';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config({ override: true });

export default defineConfig({
  plugins: [
    {
      name: 'slurry-api',
      configureServer(server) {
        server.middlewares.use('/api/narrate', (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.end('Method not allowed');
            return;
          }

          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { systemPrompt, userPrompt } = JSON.parse(body);

              const apiKey = process.env.ANTHROPIC_API_KEY;
              if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set in .env');

              const client = new Anthropic({ apiKey });
              const message = await client.messages.create({
                model: 'claude-opus-4-5',
                max_tokens: 600,
                system: systemPrompt,
                messages: [{ role: 'user', content: userPrompt }],
              });

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ text: message.content[0].text }));
            } catch (err) {
              console.error('[Slurry API] Error:', err.message);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        });
      },
    },
  ],
});
