import { Router } from "express";
import { createOrder, viewOrder, viewOrders,updateOrder, deleteOrder } from "../controllers/order";
import verifyUser from "../middleware/authentication";

const router = Router()

router.post("/create", verifyUser, createOrder);
router.patch("/:orderId", verifyUser, updateOrder)
router.get("/:orderId", verifyUser, viewOrder);
router.get("/", verifyUser,viewOrders);
router.delete("/:orderId", verifyUser, deleteOrder);

export default router