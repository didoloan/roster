import RegCodeDB from "../db/regcode"

export default class RegCodeCtrl {
    static async generate(req, res) {
        let response = await RegCodeDB.generateCodes(Number(req.body.count));
        res.json({codes:[...response]});
        return
    }
}