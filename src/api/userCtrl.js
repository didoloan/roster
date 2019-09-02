import UserDbOps from "../db/user"
import RegCode from "../db/regcode"
import Coder from "./coder"
import DateCalc from "./datecalc.js"

export default class UserCtrl {
  static async create(req, res) {
      let validCode = await RegCode.verifyCode(req.body.regcode.toString());
      if(!validCode){
        res.json({error:"Regcode Error!"})
        return
      }
      let exists = await UserDbOps.findOne(req.body.id);
      if (exists) {
          res.json({error:"Account creation Failed!"});
          return;
      }
      let code = RegCode.find(req.body.regcode.toString())
      if(code.type = "super"){
        let response = await UserDbOps.createPowerUser(Number(req.body.id), req.body.name, req.body.gender, req.body.religion, req.body.dob, await Coder.hash(req.body.password));
        if (response.insertedCount!=1) {
            res.json({error:"Account creation Failed!"});
            return;
        }
        res.json({message:"Account created successfully!"});
        return
      }
      let response = await UserDbOps.create(Number(req.body.id), req.body.name, req.body.gender, req.body.religion, req.body.dob, await Coder.hash(req.body.password));
      if (response.insertedCount!=1) {
          res.json({error:"Account creation Failed!"});
          return;
      }
      res.json({message:"Account created successfully!"});
  }

  static async login(req, res) {
      let exists = await UserDbOps.findOne(Number(req.body.id));
      if(!exists) {
        res.json({error: "Auth failed!"});
        return;
      }
      if(!exists.status) {
        res.json({error: "Auth failed!"});
        return
      }
      let passwordIsSame = await Coder.compare(req.body.password, exists.password);
      console.log(await passwordIsSame)
      if(passwordIsSame) {
        let token = await Coder.jwtEncode({id:exists.id, name: exists.name});
        res.json({token: token, user: {id: exists.id, name: exists.name, isAdmin:exists.isAdmin}});
        return;
      }
      res.json({error: "Auth failed!"});
      return;  
  }

  /* static async update(req, res) {
       let response = await UserDbOps.u
      
   }*/

  static async refresh(req, res) {
      let token = req.get('Authorization').split(" ")[1];
      let verification = await Coder.jwtDecode(token);
      let expiry = verification.exp;
      let current = Number(new Date())*1000;
      
      if(current>expiry+1000*60*60){
        res.json({error:"Token Expired!"})
        return
      }
      let newToken = await Coder.jwtEncode({id: verification.id, name: verification.name});
      res.json({token: newToken});
      return;
  }

  static async all(req, res) {
    let numPerPage = req.params.order||10
    let page = req.params.page||1
    let order = req.params.order||"asc"
  	let response = await UserDbOps.all(page, numPerPage, order);
    res.json({result: response});
    return;
  }

  static async find(req, res) {
  	let response = await UserDbOps.find({[req.body.key]: req.body.value});
    res.json({result: response});
    return
  }

  static async findOne(req, res) {
  	let response = await UserDbOps.findOne(Number(req.body.id));
    res.json({result: response});
    return
  }

  static async updateStatus(req, res) {
      let user = await UserDbOps.findOne(Number(req.body.id))
      if(user.status==req.body.newStatus){
        res.json({error:"Invalid status!"})
        return
      }
      let response = await UserDbOps.toggleStatus(Number(req.body.id), req.body.newStatus);
      if(response.modifiedCount==1){
          res.json({message:"Update successful!"})
          return
      }
      res.json({error: "Update failed!"})
      return
  }

}

