import Anthropic from '@anthropic-ai/sdk';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { systemPrompt, userPrompt } = JSON.parse(event.body);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured');

    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model:      'claude-opus-4-5',
      max_tokens: 600,
      system:     systemPrompt,
      messages:   [{ role: 'user', content: userPrompt }],
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message.content[0].text }),
    };
  } catch (err) {
    console.error('[narrate fn]', err.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
