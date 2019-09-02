import { Router } from "express"
import userCtrl from "./userCtrl"
import RegCodeCtrl from "./regcode"
import Auth from "./auth"


const router = new Router()

router.route("/").post(Auth.isAdmin, userCtrl.all);
router.route("/find").post(Auth.isAdmin, userCtrl.find);
router.route("/findOne").post(userCtrl.findOne);
router.route("/create").post(userCtrl.create);
router.route("/login").post(userCtrl.login);
router.route("/refresh").post(userCtrl.refresh);
// router.route("/update").post(Auth.isAuthenticated, userCtrl.update)
router.route("/change_status").post(Auth.isAuthenticated, userCtrl.updateStatus);
// router.route("/change_status").post(Auth.isAdmin, userCtrl.updateStatus)

export default router;
