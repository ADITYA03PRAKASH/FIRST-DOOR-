import express from 'express';
const app = express();

app.use(express.json());

app.all('/api/book', (req, res) => {
  res.status(200).json({ success: true, message: 'Minimal test booking endpoint working!' });
});

app.all('*any', (req, res) => {
  res.status(404).json({ error: 'Route not found in minimal app' });
});

export default app;
