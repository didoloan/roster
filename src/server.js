import express from "express"
import bodyParser from "body-parser"
import path from "path"
import cors from "cors"
const history = require('connect-history-api-fallback');
import userRoute from "./api/user.route"
import regCodeRoute from "./api/regcode.route"
import leaveRoute from "./api/leave.route"
import morgan from "morgan"
import RosterRT from "./api/roster.route"


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cors());
app.use(history());

app.use("/", express.static(__dirname+'/../frontend/dist/'))
app.use("/users", userRoute)
app.use("/regcode", regCodeRoute)
app.use("/leave", leaveRoute)
app.use("/roster", RosterRT)

export default app;
