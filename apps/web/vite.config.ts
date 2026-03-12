import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

function getPort(mode: string): number | undefined {
  const env = loadEnv(mode, process.cwd());

  const NODE_ENV = env.VITE_NODE_ENV;
  if (!NODE_ENV) throw new Error(`❌ Missing required environment variable: NODE_ENV`);

  if (!['dev', 'build', 'stage', 'prod'].includes(NODE_ENV))
    throw new Error(`❌ Invalid NODE_ENV: "${NODE_ENV}". Must be one of "dev", "build", "stage", "prod"`);

  const value = env.VITE_WEB_PORT;

  if (!value && ['dev', 'build'].includes(NODE_ENV))
    throw new Error(`❌ Missing required VITE_WEB_PORT when NODE_ENV is ${NODE_ENV}`);
  if (value && isNaN(Number(value))) throw new Error(`❌ Invalid value for VITE_WEB_PORT: "${value}" is not a number`);

  return Number(value) || undefined;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: getPort(mode),
    strictPort: true,
    host: '0.0.0.0', // for docker
    // hmr: {
    //   overlay: false,
    // },
  },
  plugins: [react(), mode === 'development' && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
