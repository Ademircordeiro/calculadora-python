import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Endpoint to get files content
  app.get('/api/files', (req, res) => {
    try {
      const files: Record<string, string> = {
        'operations.py': fs.readFileSync(path.join(__dirname, 'operations.py'), 'utf-8'),
        'main.py': fs.readFileSync(path.join(__dirname, 'main.py'), 'utf-8'),
        'test_operations.py': fs.readFileSync(path.join(__dirname, 'test_operations.py'), 'utf-8'),
        'README.md': fs.readFileSync(path.join(__dirname, 'README.md'), 'utf-8'),
      };
      res.json({ success: true, files });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Endpoint to run real Python unittests
  app.post('/api/run-tests', async (req, res) => {
    try {
      const { stdout, stderr } = await execAsync('python3 -m unittest -v', {
        cwd: __dirname,
        timeout: 5000,
      });
      // unittest outputs details to stderr
      const output = (stderr || stdout || '').trim();
      res.json({
        success: true,
        output,
        passed: output.includes('OK') && !output.includes('FAILED'),
      });
    } catch (err: any) {
      res.json({
        success: false,
        output: err.stderr || err.stdout || err.message,
        passed: false,
      });
    }
  });

  // Endpoint to execute python operation
  app.post('/api/calculate', async (req, res) => {
    try {
      const { op, a, b, deg } = req.body;

      // Sanitização básica do nome da operação
      if (!op || typeof op !== 'string' || !/^[a-zA-Z0-9_]+$/.test(op)) {
        return res.status(400).json({ success: false, error: 'Operação inválida.' });
      }

      let invocation = '';
      const trigOps = ['seno', 'cosseno', 'tangente', 'arco_seno', 'arco_cosseno', 'arco_tangente'];

      if (trigOps.includes(op)) {
        const emGraus = deg ? 'True' : 'False';
        invocation = `print(fn(${Number(a)}, em_graus=${emGraus}))`;
      } else if (b !== undefined && b !== null) {
        invocation = `print(fn(${Number(a)}, ${Number(b)}))`;
      } else {
        invocation = `print(fn(${Number(a)}))`;
      }

      const cmd = `python3 -c "import operations; fn = getattr(operations, '${op}'); ${invocation}"`;
      const { stdout } = await execAsync(cmd, { cwd: __dirname, timeout: 3000 });
      res.json({ success: true, result: parseFloat(stdout.trim()) });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        error: err.stderr?.trim() || err.message,
      });
    }
  });

  // Integrate Vite dev server middleware in development
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
