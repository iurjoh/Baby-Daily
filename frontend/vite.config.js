import { defineConfig, transformWithEsbuild } from "vite";
export default defineConfig({
  plugins: [{name: "jsx-in-js", async transform(code, id) {
    if (id.includes("/src/") && id.endsWith(".js")) {
      return transformWithEsbuild(code, id, {loader: "jsx", jsx: "automatic"});
    }
  }}],
  optimizeDeps: {esbuildOptions: {loader: {".js": "jsx"}}},
  build: {outDir: "build"},
  server: {proxy: {"/api": "http://127.0.0.1:8000"}},
  test: {environment: "jsdom", globals: true, setupFiles: ["./src/setupTests.js"], environmentOptions: {jsdom: {url: "http://localhost:3000"}}},
});
