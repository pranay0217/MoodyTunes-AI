import User from "../model/User.js";

// ✅ Set all favorites at once
export const setFavorites = async (req, res) => {
  const { username } = req.params;
  const { favorites } = req.body; // favorites = [{videoId, title, thumbnail}, ...]

  try {
    let user = await User.findOne({ username });

    // If user doesn't exist, create new with favorites
    if (!user) {
      user = await User.create({
        username,
        favorites: favorites || [],
        history: [],
      });
      return res.json(user);
    }

    // Overwrite user's favorites
    user.favorites = favorites || [];
    await user.save();

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add to history (store all, no limit)
export const addToHistory = async (req, res) => {
  const { username, videoId, title, thumbnail, tab, timestamp } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      user = await User.create({
        username,
        favorites: [],
        history: [{ videoId, title, thumbnail, tab, timestamp }],
      });
      return res.json(user);
    }

    user.history.push({ videoId, title, thumbnail, tab, timestamp });
    await user.save();

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get profile (favorites + history)
export const getProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne(
      { username },
      { _id: 0, email: 1, favorites: 1, history: 1 }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /dash/clearHistory/:username
export const clearHistory = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.history = [];
    await user.save();

    res.json({ message: "History cleared successfully", history: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE /dash/clearFavorites/:username
export const clearFavorites = async (req, res) => {
  const { username } = req.params;  // Extract from URL

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.favorites = [];
    await user.save();

    res.json({ message: "Favorites cleared successfully", favorites: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
