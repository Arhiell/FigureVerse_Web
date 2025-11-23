import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8082;
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

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Cliente Web listening on ${PORT}`);
});