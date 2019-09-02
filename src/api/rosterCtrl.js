import RosterDB from "../db/roster"

export default class RosterController {
    static async getRoster(req, res) {
        let month = await Number(req.query.month)
        let ros = await RosterDB.populate_month(month)
        res.json({result:ros})
    }
}