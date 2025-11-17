const { User, Store, Rating } = require("../models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const { hashPassword } = require("../helpers/password");



// GET USERS

exports.getUsers = async (req, res) => {
  try {
    const { search, role, sort = "name", order = "asc" } = req.query;

    const where = {};

    if (role) where.role = role;

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { address: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const users = await User.findAll({
      where,
      order: [[sort, order]],
      attributes: ["id", "name", "email", "address", "role"]
    });

    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};


// GET STORES


exports.getStores = async (req, res) => {
  try {
    const { search, sort = "name", order = "asc" } = req.query;

    const where = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { address: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const stores = await Store.findAll({
      where,
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["name", "email"]
        },
        {
          model: Rating,
          include: [
            {
              model: User,
              attributes: ["name", "email"]
            }
          ]
        }
      ],
      order: [[sort, order.toUpperCase()]]
    });

    // Add avg_rating & rating_count
    const result = stores.map((store) => {
      const ratings = store.Ratings || [];

      const avg_rating = ratings.length
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        : 0;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        owner: store.owner,
        rating_count: ratings.length,
        avg_rating: avg_rating.toFixed(2)
      };
    });

    res.json({ stores: result });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching stores" });
  }
};



// CREATE USER

exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, address, role } = req.body;

    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: "Email exists" });

    const hashed = await hashPassword(password);

    const user = await User.create({ name, email, password: hashed, address, role });

    res.json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};



// CREATE STORE

exports.createStore = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors });

    const { name, email, address, owner_id } = req.body;

    const owner = await User.findByPk(owner_id);
    if (!owner || owner.role !== "store_owner")
      return res.status(400).json({ message: "Invalid store owner" });

    const store = await Store.create({
      name,
      email,
      address,
      owner_id,
      avg_rating: 0
    });

    res.json({ message: "Store created", store });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};

exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalOwners = await User.count({ where: { role: "store_owner" } });
    const totalRatings = await Rating.count();

    res.json({
      totalUsers,
      totalStores,
      totalOwners,
      totalRatings
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not fetch stats" });
  }
};
