import { Router } from 'express';
import { z } from 'zod';

export const messageRouter = Router();

const messageSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(10).max(1500)
});

messageRouter.post('/messages', (req, res) => {
  const result = messageSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      ok: false,
      message: 'Validation failed.',
      issues: result.error.issues
    });
  }

  console.log('New contact message:', {
    ...result.data,
    receivedAt: new Date().toISOString()
  });

  return res.status(201).json({
    ok: true,
    message: 'Message received.',
    id: `msg_${Date.now()}`
  });
});
