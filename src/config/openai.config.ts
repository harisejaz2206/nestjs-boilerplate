import { registerAs } from '@nestjs/config';

// Kept as an opt-in template hook for future AI features.
// No OpenAI client or business workflow is registered by default.
export default registerAs('openai', () => ({
  apiKey: process.env.OPENAI_API_KEY ?? '',
  model: process.env.OPENAI_MODEL ?? 'gpt-5-mini',
  reasoningEffort: process.env.OPENAI_REASONING_EFFORT ?? 'low',
}));
