import UserDbOps from "./db/user"
import RegCodeDB from "./db/regcode"
import RosterDB from "./db/roster"
import { MongoClient } from "mongodb" 
import app from "./server"

const port = process.env.PORT;
MongoClient.connect(
    process.env.ROSTER_DB,
    { poolSize:50, useNewUrlParser:true },
)
.catch(err => {
    console.error(err.stack);
    process.exit(1);
})
.then(async client => {
    await UserDbOps.injectDB(client)
    await RegCodeDB.injectDB(client)
    await RosterDB.injectDB(client)
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
})