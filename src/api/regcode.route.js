import { Router } from "express"
import RegCodeCtrl from "./regcode"

const router = new Router();

router.route("/generate").post(RegCodeCtrl.generate);

export default router;