export default class DateCalc {
    static convert(date) {
        return new Date(date*1000); 
    }
    static async calcDiff(exp) {
        let current = Number(new Date());
        if(current<exp){
            return false
        }
        return await current>exp*1000+3600;
    }
}