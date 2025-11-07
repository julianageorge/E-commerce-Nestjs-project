import { access } from "fs";

export default()=>( {
    port:process.env.PORT,
    db:{
        url:process.env.DB_URL
    },
    token:{},
    cloud:{},
    mail:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    },
    access:{
        jwt_secret:process.env.ACCESS_SECRET,
    }
    
})