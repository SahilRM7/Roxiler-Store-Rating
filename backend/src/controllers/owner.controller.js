const { Store, Rating, User } = require("../models");

exports.ownerDashboard = async (req, res) => {
  try {
    const stores = await Store.findAll({
      where: { owner_id: req.user.id },
      include: [
        {
          model: Rating,
          include: [{ model: User }]  // IMPORTANT FIX
        }
      ]
    });

    const result = stores.map((store) => {
      const ratings = store.Ratings || [];

      const avg_rating = ratings.length
        ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
        : 0;

      return {
        id: store.id,
        name: store.name,
        avg_rating,
        Ratings: ratings.map((r) => ({
          id: r.id,
          rating: r.rating,
          user: {
            name: r.User?.name || "Unknown User",   // SAFE
            email: r.User?.email || "Unknown",      // SAFE
          }
        }))
      };
    });

    res.json({ stores: result });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot load owner dashboard" });
  }
};
