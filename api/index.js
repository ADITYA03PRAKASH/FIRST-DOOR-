import express from 'express';

let app;
let importError = null;

try {
  const module = await import('../server.js');
  app = module.default;
} catch (err) {
  importError = {
    message: err.message,
    stack: err.stack,
    name: err.name
  };
}

if (importError) {
  console.error('Express startup error detected:', importError);
  const fallbackApp = express();
  
  // Clean fallback route to return the exact diagnostic details
  fallbackApp.all('*any', (req, res) => {
    res.status(500).json({
      error: 'Express backend startup failed',
      details: importError
    });
  });
  app = fallbackApp;
}

export default app;
