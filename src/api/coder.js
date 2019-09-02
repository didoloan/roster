import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export default class Auth {
    static async jwtEncode(payload) {
        return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'});
    }
    static async jwtDecode(token) {
        return jwt.verify(token, process.env.SECRET_KEY);
        // , (err, payload) => {
        //     if(err){
        //         return {error: err.name}
        //         error;
        //     }
        //     return payload;
        // })
    }

    static async hash(plaintext) {
        return await bcrypt.hash(plaintext, 10)
    }
    static async compare(plaintext, hash) {
        return await bcrypt.compare(plaintext, hash);
    }
}