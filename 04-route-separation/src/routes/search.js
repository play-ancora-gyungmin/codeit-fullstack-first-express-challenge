import express from 'express';

export const searchRouter = express.Router();

// GET /search - 검색 기능
searchRouter.get('/', (req, res) => {
  const { q, limit = 10 } = req.query;
  res.json({ query: q, limit: Number(limit) });
});