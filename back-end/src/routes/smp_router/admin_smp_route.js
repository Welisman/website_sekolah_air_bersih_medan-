const express = require("express");
const router = express.Router();
const {
  addAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  toggleStatusAdmin,
  loginAdmin
} = require("../../controllers/smp_controller/admin_smp_controller");
const { verifyToken, isMasterAdmin } = require("../../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.get("/admin-smp", verifyToken, getAdmins);
router.post("/add-admin-smp", verifyToken, isMasterAdmin, addAdmin);
router.put("/update-admin-smp/:id", verifyToken, isMasterAdmin, updateAdmin);
router.delete("/delete-admin-smp/:id", verifyToken, isMasterAdmin, deleteAdmin);
router.put("/toggle-status-admin-smp/:id", verifyToken, isMasterAdmin, toggleStatusAdmin);
  
module.exports = router;
