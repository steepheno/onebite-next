/* API routes는 자주 쓰이지 않음 (참고만 해도 됨) */
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();
  res.json({ time: date.toLocaleDateString() });
}
