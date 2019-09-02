import LeaveDB from "../db/leave"

export default class LeaveCtrl {
    static async apply(req, res) {
        let response = await LeaveDB.apply(req.body.id, req.body.startdate, req.body.enddate);
        if(response.insertedCount!=1){
            res.json({error:"Application failed!"})
        }
        res.json({message:"Application sent!"})
    }
    
    static async all(req, res) {
        let response = await LeaveDB.all()
    }

    static async current(req,res) {
        let response = await LeaveDB.current()
        res.json({result:response})
    }

    static async finduser(req, res) {
        let response = await LeaveDB.finduser(req.body.id)
        res.json({result:response})
    }
}