import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const META_PIXEL_ID = process.env.META_PIXEL_ID || "26794598016845961";
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || "EAAZAYMquEn7MBRcFXnvYYQSdJw1ZCBLg6ZCQT8iUZBiQt9f6jedkZC1IExa9jltx1SNY4U3uNxAyBJ0Jrowwh0hJZB38WLqbZCKMMhbdumNiBDNO7GpZCJv4pfyO8RmBvWayzKHdffToUnlnttrIFsZB2K0kFV6TTejaK66F2bLgQb82qM2U4B7hLF5AAufQ1SGeBkwZDZD";

// Meta Conversion API Endpoint
app.post("/api/track-event", async (req, res) => {
  const { eventName, userData, customData } = req.body;

  try {
    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: req.headers.referer || "",
          user_data: {
            client_ip_address: req.ip,
            client_user_agent: req.headers["user-agent"],
            ...userData
          },
          custom_data: customData
        }
      ]
    };

    const response = await fetch(`https://graph.facebook.com/v17.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("CAPI Result:", result);
    res.json(result);
  } catch (error) {
    console.error("CAPI error:", error);
    res.status(500).json({ error: "Failed to track event" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
