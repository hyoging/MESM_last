const express = require("express");

const app = express();

const bodyParser = require("body-parser");
app.use( bodyParser.urlencoded({ extended : true }) );

const session = require("express-session");
const sessionConfig =  require("./config/cookie_session/session");
app.use( session(sessionConfig.sessionConfig) );
const cookieParser = require("cookie-parser");
app.use( cookieParser("secret") );

const router = require("./src/routers/router")(app);

app.use("/", router);

app.get('/',function(req,res){
   console.log('Cookies:',req.Console)
   console.log('Signed Cookies:',req.signedCookies)
})

//app.get("/", (req, res)=> res.send("서버 연동") );

app.set("views", __dirname+"/src/views");
app.set("view engine","ejs");

app.use(express.static('src'));
app.set("img",__dirname+"/src/img");

app.listen(3000, ()=>{ console.log("3000 서버 연동"); });