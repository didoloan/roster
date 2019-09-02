let leave
let roster
export default class Leave {
    static async injectDB() {
        try{
            roster = await conn.db(process.env.ROSTER_NS)
            leave = await conn.db(process.env.ROSTER_NS).collection("leave")
        } catch(e) {
            console.error(`Unable to establish connection to accounts collection: ${e}`)
        }
    }
    static async apply(tcid, startdate, enddate) {
        let response = await leave.insertOne({id:tcid, startdate: new Date(startdate), enddate: new Date(enddate), created: new Date(), updated: null});
        return response;
    }
    static async current() {
        let response = await leave.find({enddate:{$gte:new Date()}});
        
        return response;
    }
    static async update() {

    }
    static async delete() {

    }
}