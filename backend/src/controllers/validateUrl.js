export const validateUrlBody = (req, res, next) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "url is required" });
  
    try {
      new URL(url);
      next();
    } catch {
      return res.status(400).json({ error: "Invalid URL" });
    }
  };
  