import LeaveCtrl from "./leave"
import { Router } from "express"

const router = new Router()

router.route("/apply").post(LeaveCtrl.apply)
router.route("/current").post(LeaveCtrl.current)

export default router;
