const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

const {
  getUsers,
  getStores,
  createUser,
  createStore,
  getAdminStats
} = require('../controllers/admin.controller');

const {
  createUserValidator,
  createStoreValidator
} = require('../validators/admin.validator');

router.get('/users', authMiddleware, isAdmin, getUsers);
router.get('/stores', authMiddleware, isAdmin, getStores);

router.post('/users', authMiddleware, isAdmin, createUserValidator, createUser);
router.post('/stores', authMiddleware, isAdmin, createStoreValidator, createStore);
router.get("/stats", authMiddleware, isAdmin, getAdminStats);


module.exports = router;
