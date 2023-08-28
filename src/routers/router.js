module.exports = (app) =>{
    const pageRouter = require("../routers/mesm_router");
    app.use("/", pageRouter);

    const router = require("express").Router();
    const config = require("../../config/cookie_session/session")
    // router.get("/login", (req,res)=>{
    //     if(req.session.username){
    //         res.cookie("isLogin",true);
    //     }
    //     res.render("index" , {username : req.session.username }); 

    // })
    
    return router;
}