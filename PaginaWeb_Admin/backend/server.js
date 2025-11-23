import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8081;
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const API_PROXY_PATH = process.env.API_PROXY_PATH || "/api";

app.use(cors({ origin: true, credentials: true }));
app.options("*", cors());

app.use(API_PROXY_PATH, createProxyMiddleware({
  target: API_BASE_URL,
  changeOrigin: true,
  pathRewrite: { ["^" + API_PROXY_PATH]: "" },
  onProxyRes(proxyRes, req, res) {
    const origin = req.headers.origin || "*";
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  }
}));

app.get("/env.js", (req, res) => {
  res.type("application/javascript").send(
    `window.__ENV__={API_BASE_URL:"${API_PROXY_PATH}"}`
  );
});

const distDir = path.join(__dirname, "../web/dist");
const legacyDir = path.join(__dirname, "../frontend");
const publicDir = fs.existsSync(distDir) ? distDir : legacyDir;

app.use(express.static(publicDir));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Admin Web listening on ${PORT}`);
});