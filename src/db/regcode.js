let roster
let regcodes

export default class RegCode {
    static async injectDB(conn) {
        try {
            roster = await conn.db(process.env.ROSTER_NS);
            regcodes = await conn.db(process.env.ROSTER_NS).collection("regcodes");   
        } catch (error) {
            console.error(`Unable to establish connection to regcodes collection: ${error}`);
        }
    }
    static async generateCodes(numcodes) {
        let date    = new Date();
        let codes   = [];
        let many    = [];

        for(let i=0;i<numcodes;i++){
            let code = Math.random().toString().slice(2,8);
            console.log(await code);
            codes.push(code);
            many.push({code:await code, type:'normal', created:new Date(date), expiry:new Date(date.getFullYear(), date.getMonth(), [date.getDate()+1])})
        }
        console.log(many);
        let response = await regcodes.insertMany([...many]);
        if(response.insertedCount==numcodes){
            return codes;
        }
    }
    static async find(code) {
        let response = await regcodes.findOne({code:code});
        return response
    }
    static async verifyCode(code) {
        let date = new Date()
        let regcode = await regcodes.findOne({code:code});
        if(!regcode) {
            return false;
        }
        let exp = new Date(regcode.expiry);
        return ((exp.getMonth()==date.getMonth())&&(exp.getDate()>date.getDate()));
    }



}