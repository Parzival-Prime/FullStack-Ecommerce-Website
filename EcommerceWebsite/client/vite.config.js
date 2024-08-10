import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     fs: {
//       exclude: ['/F:/WebDevelopment/InternShip/CodSoft/EcommerceWebsite/server'],
//     },
//   },
// })



// import { nodePolyfills } from 'vite-plugin-node-polyfills';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), nodePolyfills()],
//   optimizeDeps: {
//     exclude: ['@mapbox/node-pre-gyp', 'mock-aws-s3', 'aws-sdk', 'nock'],
//   },
//   build: {
//     outDir: 'dist',
//     rollupOptions: {
//       external: ['@mapbox/node-pre-gyp', 'mock-aws-s3', 'aws-sdk', 'nock'],
//     },
//   },
// })


// import { nodePolyfills } from 'vite-plugin-node-polyfills';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), nodePolyfills()],
//   build: {
//     outDir: 'dist',
//     rollupOptions: {
//       // Exclude specific files or directories from being processed
//       optimizeDeps: {
//             exclude: ['@mapbox/node-pre-gyp', 'mock-aws-s3', 'aws-sdk', 'nock'],
//           },
//       external: [
//         '@mapbox/node-pre-gyp', 
//         'mock-aws-s3', 
//         'aws-sdk', 
//         'nock'
//       ],
//       // Add a custom plugin or configuration to handle .html files if necessary
//     },
//   },
// })