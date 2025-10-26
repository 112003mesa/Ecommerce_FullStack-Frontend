import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// export default Vite config
export default defineConfig({
  plugins: [react()],
  server: {port: 5173}
});
