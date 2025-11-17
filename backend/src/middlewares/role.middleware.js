exports.isAdmin = (req, res, next) => {
  if (req.user.role === "admin") return next();
  return res.status(403).json({ message: "Admin only" });
};

exports.isUser = (req, res, next) => {
  if (req.user.role === "user") return next();
  return res.status(403).json({ message: "User only" });
};

exports.isStoreOwner = (req, res, next) => {
  if (req.user.role === "store_owner") return next();
  return res.status(403).json({ message: "Store owner only" });
};
