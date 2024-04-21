import {Router} from "express"
import order from "./order"
import user from "./user"

const router = Router();

router.use("/users", user);
router.use("/orders", order);

export default router;
