import Coder from "./coder"
import UserDbOps from "../db/power-user"

let roles = ['S', 'PM', 'APM', 'LA']


export default class PowerUser {
    static async create(req, res) {
        let exists = await UserDbOps.findOne("id", req.body.id)
        let validrole = false;
        if (exists) {
            res.json({error:"Account creation Failed!"})
            return
        }
        for(role in roles) {
            if(req.body.role==roles[role]){
                validrole=true
            }
        }
        if(validrole == false){
            res.json({error:"Invalid role specified!"})
        }
        let response = await UserDbOps.create(req.body.id, req.body.name, req.body.role, req.body.gender, req.body.dob, await Coder.hash(req.body.password))
        if (response.insertedCount!=1) {
            res.json({error:"Account creation Failed!"})
            return
        }
        res.json({message:"Account created successfully!"})
    }
    static async login(req, res) {
        let exists = UserDbOps.findOne("id", req.body.id)
        if(!exists){
            res.json({error: "Auth failed!"})
            return
        }
        let passwordIsSame = await coder.compare(req.body.password, exists.password)
        if (!passwordIsSame) {
            res.json({error: "Auth failed!"})
            return
        }
        res.json({token: await Coder.jwtEncode({id:exists.id, name: exists.name}), user: {id: exists.id, name: exists.name}})
        return
    }
  
    static async update(req, res) {
        
    }
  
    static async refresh(req, res) {
        let token = req.body.token
        let verification = await Coder.jwtDecode(token)
        if(verification.error) {
            res.json({error: verification.error})
            return
        }
        res.json({token: await Coder.jwtEncode(verification)})
        return
    }
  
    static async all(req, res) {
        let response = await UserDbOps.all();
      res.json({result: response})
    }
    static async find(req, res) {
        let response = await UserDbOps.find(request.body.key, request.body.keyValue);
      res.json({result: response})
    }
    static async findOne(req, res) {
        let response = await UserDbOps.findOne(request.body.key, request.body.keyValue);
      res.json({result: response});
    }
    static async updateStatus(req, res) {
        let response = await UserDbOps.toggleStatus(req.body.id)
    }
}