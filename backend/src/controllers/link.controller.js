import Link from "../models/link.model.js";
export const createLink = async (req, res) => {
    try {
      const { code, url } = req.body;
  
      if (!code || !url) return res.status(400).json({ error: "code and url required" });
  
      if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
        return res.status(400).json({ error: "code must match [A-Za-z0-9]{6,8}" });
      }
  
      const existing = await Link.findOne({ code });
      if (existing) return res.status(409).json({ error: "Code exists" });
  
      const link = await Link.create({ code, url });
  
      const shortUrl = `${process.env.BASE_URL}/${code}`;
  
      return res.status(201).json({
        ...link._doc,
        shortUrl
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };
  

export const listLinks = async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getLink = async (req, res) => {
  try {
    const code = req.params.code;
    const link = await Link.findOne({ code });
    if (!link) return res.status(404).json({ error: "Not found" });
    res.json(link);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const code = req.params.code;
    const result = await Link.deleteOne({ code });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
