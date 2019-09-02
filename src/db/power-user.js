let roster
let users

export default class User {
    static async injectDB(conn) {
        try{
            roster = await conn.db(process.env.ROSTER_NS)
            users = await conn.db(process.env.ROSTER_NS).collection("power-users")
        } catch(e) {
            console.error(`Unable to establish connection to accounts collection: ${e}`)
        }
    }
    static async create(id, name, role, gender, dob, superuser, password){
        let response = await users.insertOne({id: id, name: name, role: role,  gender: gender, dob: dob, password:password, isAdmin:true, isSuperUser:superuser, created: new Date()});
      return response;
    }
    static async find(key, keyValue) {
        let response = await users.find({[key]: keyValue});
      return response;
    }
    static async findOne(key, keyValue) {
        let response = await users.findOne({[key]: keyValue});
      return response;
    }
    static async togglestatus(id, newStatus) {
        let response = await users.updateOne({id:id}, {$set:{status: newStatus}});
      return response;
    }
    static async all(page, numPerPage, order) {
        let response = await users.find().sort({id: -1}).skip(numPerPage*page).limit(numPerPage);
      return response;
    }
    
  }