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
    }
    
})