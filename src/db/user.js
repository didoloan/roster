let roster
let users
let validFilter = ['name', 'religion', 'gender', 'dob', 'age']
export default class User {
    static async injectDB(conn) {
        try{
            roster = await conn.db(process.env.ROSTER_NS);
            users = await conn.db(process.env.ROSTER_NS).collection("users");
            
        } catch(e) {
            console.error(`Unable to establish connection to users collection: ${e}`);
        }
    }
    static async create(id, name, role, gender, religion, dob, password) {
        let response = await users.insertOne({id:id, name:name, role:role, gender:gender, religion:religion, dob:dob, password:password, created:new Date(), isAdmin:false, status:true});
        return response;
    }
    
    static async createPowerUser(id, name, role, gender, religion, dob, password) {
        let response = await users.insertOne({id: id, name: name, role: role,  gender: gender, religion:religion, dob: dob, password:password, created:new Date(), isAdmin:true, status:true});
        return response;
    }

    static async find(filter) {
        let trimmedFilter = {}
        let keys = []
        let count = 0
        for(key in filter){
            for(filter of validFilter){
                if(filter == key){
                    trimmedFilter[key] = filter[key]
                }
            }
            keys.push(key)
        }
        let response = await users.find({id: id});
        return response;
    }
    static async findOne(id) {
        let response = await users.findOne({id: id});
        return response;
    }
    static async toggleStatus(id, newStatus) {
        console.log(newStatus);
        console.log(id);
        let response = await users.updateOne({id:id}, {$set:{status: newStatus}});
        return response;
    }
    static async all(page, numPerPage, order) {
        let response = (order="asc")? await users.find().sort({id: 1}).skip(numPerPage*(page-1)).limit(numPerPage):await users.find().sort({id: -1}).skip(numPerPage*(page-1)).limit(numPerPage)
        return response;
    }
    
  }