import Coder from "./coder"
import UserDbOps from "../db/user"
export default class Auth {
    static async isAdmin(req, res, next) {
        let userFromToken = await Coder.jwtDecode(req.body.token);
        let user = await UserDbOps.findOne(userFromToken.id);
        if (!user.isAdmin){
            res.json({error: "Unauthorized"});
            return;
        }
        next();
    }

    static async isSupervisor(req,res,next) {
        let token = req.get('Authorization')?req.get('Authorization').split(' ')[1]:'notoken'
        let userFT = await Coder.jwtDecode(token)
        if(!userFT.isSupervisor) {
            res.json({error:'Unauthorized'});
            return;
        }
        next();
    }

    static async isAuthenticated(req, res, next) {
        let token = req.get("Authorization")?req.get("Authorization").split(' ')[1]:''
        if(token=='') {
            console.log('failed');
            res.json({error:'no token provided'});
            return;
        }
        let userFromToken = await Coder.jwtDecode(token);
        let user = await UserDbOps.findOne(userFromToken.id);
        if(user) {
            console.log(failed);
            res.json({error: "Not Authenticated"});
            return;
        }
        next();
    }
}