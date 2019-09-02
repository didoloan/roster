

const monthdays = {'30':[9, 4, 6, 11], '28':[2], '31': [1, 3, 5, 7, 8, 10, 12]}
const orderings = [
    ['1A','1B','2A','2B','3','OA','OB'],
    ['2A','2B','3','OA','OB','1A','1B'],
    ['3','OA','OB','1A','1B','2A','2B'],
    ['OA','OB','1A','1B','2A','2B','3'],
    ['2B','3','OA','OB','1A','1B','2A'],
    ['1B','2A','2B','3','OA','OB','1A'],
    ['OB','1A','1B','2A','2B','3','OA']
]
let roster
let rosters
export default class Roster {
    static async injectDB(conn) {
        try {
            roster = await conn.db(process.env.ROSTER_NS)
            rosters = await conn.db(process.env.ROSTER_NS).collection('rosters')
        } catch (error) {
            console.error(`Unable to establish connection to rosters collection. ${error}`)
        }
    }
    static async insertLastIndex(month, lastindex) {
        let year = new Date().getFullYear
        let response = await rosters.updateOne({month:month,year:year},{$set:{month:month, year:new Date().getFullYear(), last_index:lastindex}},{upsert:true})
        return response
    }
    static async getLastIndex(month) {
        let response = await rosters.findOne({month:month})
        console.log(await response)
        return response['last_index']
    }
    static async add(month) {

    }
    static is_leap(month) {
        return (year%4==0 && year%100!=0 || year%400==0)
    }
    static get_days(month){
        if(month==2 && is_leap(month)){
            return 29
        }else{
            for(let key in monthdays) {
                for(let mth of monthdays[key]){
                    if(month==mth){
                        return Number(key)
                    }
                }
            }            
        }
    }
    static next(index) {
        let nextIndex = (index<6)? index+1 : 0
        return nextIndex
    }
    static collectLike(pair){
        let shifts = {1:[],2:[],3:[],'OFF':[]}
        for(let shift in pair){
            if(pair[shift][0]=='1'){
                shifts[1].push(shift)
            }else if(pair[shift][0]=='2'){
                shifts[2].push(shift)
            }else if(pair[shift][0]=='3'){
                shifts[3].push(shift)
            }else if(pair[shift][0]=='O'){
                shifts['OFF'].push(shift)
            }       
        }
        return shifts
    }

    static getGroupandShift(index){
        let pair = {}
        console.log(index)
        for(let e in orderings){
            // console.log(e)
            switch (e) {
                case '0':
                    pair[1] = orderings[e][index]
                    break;
                case '1':
                    pair[2] = orderings[e][index]
                    break;
                case '2':
                    pair[3] = orderings[e][index]
                    break;
                case '3':
                    pair[4] = orderings[e][index]
                    break;
                case '4':
                    pair[5] = orderings[e][index]
                    break;
                case '5':
                    pair[6] = orderings[e][index]
                    break;
                case '6':
                    pair[7] = orderings[e][index]
                    break;
                default:
                    break;
            }
            
        }
        return this.collectLike(pair)
    }
    
    static async populate_month(month) {
        let days = this.get_days(month)
        let monthroster = {};
        let last_index = await this.getLastIndex(month-1);
        for(let i = 1; i<=days; i++) {
            monthroster[i] = await this.getGroupandShift(last_index);
            last_index = this.next(last_index);
        }
        let resp = await this.insertLastIndex(month, last_index)
        if(resp.insertedCount==1){
            console.log('DB updated accordingly.')
        }
        return monthroster; 
    }   
        
}