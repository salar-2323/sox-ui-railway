import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// دیتابیس ساده داخل حافظه
let configs = [];
let users = [];

// کاربران
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.json({ ok: true, user });
});

// کانفیگ‌ها
app.get("/api/configs", (req, res) => {
  res.json(configs);
});

app.post("/api/configs", (req, res) => {
  const cfg = { id: Date.now(), ...req.body };

  // ساخت لینک VLESS / VMESS
  if (cfg.protocol === "vless") {
    cfg.link = `vless://${cfg.username}@${cfg.host}:${cfg.port}?security=reality&flow=xtls-rprx-vision`;
  }

  if (cfg.protocol === "vmess") {
    cfg.link = `vmess://${Buffer.from(JSON.stringify({
      v: "2",
      ps: cfg.username,
      add: cfg.host,
      port: cfg.port,
      id: cfg.uuid || "00000000-0000-0000-0000-000000000000",
      net: "tcp",
      type: "none",
      tls: "tls"
    })).toString("base64")}`;
  }

  configs.push(cfg);
  res.json({ ok: true, config: cfg });
});

// سلامت
app.get("/api/health", (req, res) => {
  res.json({ ok: true, msg: "God-mode backend is alive 😈" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("API running on port", port));
