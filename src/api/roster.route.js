import { Router } from "express"
import RosterCtrl from "./rosterCtrl"

const router = new Router()

router.route("/get_roster").post(RosterCtrl.getRoster)

export default router;