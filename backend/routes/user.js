import express from 'express';
const router = express.Router();
import userController from '../controller/user.js';

// User authentication routes
router.post("/createUser", userController.createUser);
router.post("/login", userController.login);

// LOINC search routes
router.get("/search", userController.searchLoinc);
router.get("/loinc/:code", userController.getLoincByCode);
router.get("/loinc-stats", userController.getLoincStats);

// Commented routes for future implementation
// router.post("/forgotPassword", userController.forgotPassword);
// router.post("/resetPassword", userController.resetPassword);

export default router;