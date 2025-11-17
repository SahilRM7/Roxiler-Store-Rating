const { Store, Rating, User } = require("../models");

exports.getUserStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [
        {
          model: Rating,
          include: [{ model: User }]
        }
      ]
    });

    const result = stores.map(store => {
      const ratings = store.Ratings || [];

      const avg_rating = ratings.length
        ? ratings.reduce((s, r) => s + r.rating, 0) / ratings.length
        : 0;

      const user_rating =
        ratings.find(r => r.user_id === req.user.id)?.rating || 0;

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        avg_rating,
        user_rating
      };
    });

    res.json({ stores: result });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to load stores" });
  }
};


exports.rateStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const { rating } = req.body;

    let existing = await Rating.findOne({
      where: {
        user_id: req.user.id,
        store_id: storeId
      }
    });

    if (existing) {
      existing.rating = rating;
      await existing.save();
    } else {
      await Rating.create({
        user_id: req.user.id,
        store_id: storeId,
        rating
      });
    }

    res.json({ message: "Rating saved" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Rating failed" });
  }
};
