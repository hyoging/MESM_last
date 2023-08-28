const ser = require("../service/mesm_service");

const cookieConfig = {
    httpOnly : true,
    maxAge : 500000,
    signed : true
}

const views = {
    index : (req,res)=>{
        console.log(req.session.username);
        res.render("index");
    },
     login :(req,res)=>{
        res.render("member/login",{username : req.session.username});
    },
   
    main : (req,res)=>{
        let userCookie = req.signedCookies.myCookie;
     console.log("쿠키 : ", req.cookies);
     res.cookie("myCookie", req.session.username, cookieConfig); //쿠키 생성
      console.log(userCookie);
      res.render("main", {userCookie});
    }, 
    logOut : (req,res)=>{
        req.session.destroy();
        res.clearCookie('myCookie');
        const msg = `<script>
                        alert("로그아웃 완료!");
                        location.href = "/";
                    </script>`;
        res.send(msg);
 
    },
    plantMy : async (req,res)=>{
        //console.log("plantMy",req.session.username);
        id = req.session.username;
        const result = await ser.serPlant.plantMy(id);
        console.log("플랜트마이: ",result);
        if(result.length >= 1){
            res.render("plant/plant_my",{username : req.session.username, result});
        }else{
            const msg = `<script>
            alert("등록된 식물이 없습니다!");
            location.href = "/main";
            </script>`;
            res.send(msg);
       }
        
    
    },
    join_form : (req,res)=>{
        res.render("member/join");
    },
    mypage : async (req,res)=>{
       
        res.render("member/mypage",{username:req.session.username});
    },
   
    plantRegForm : async (req,res)=>{
     
        const result = await ser.serPlant.plantSearch(req.query.p_name);
       // console.log("궁금해",req.session.username)
        console.log("식물리스트출력", result)
        
        if(result.search.length == 0){
            res.send(result.msgPack);
        }else{
            
          res.render("plant/plant_reg_form", {search : result.search, username : req.session.username})
       
        }
    },
    boardList : async (req,res)=>{
         const data = await ser.serBoard.boardList();
         //console.log("boardList_ctrl: ",data);
         res.render("board/board_list", {data, username:req.session.username});
    },
    content : async ( req,res )=>{
        console.log("content ctrl: ",req.params.num);
        const data = await ser.serBoard.content(req.params.num);
        console.log("컨텐츠 데이터: ",data);
        res.render("board/content",{data, username:req.session.username});
    },
    insertForm : (req , res)=>{
        res.render("board/insert_form");
    },
    memberInfo : async (req,res)=>{
        console.log("memberInfo ctrl: ",req.params);
        const member=await ser.serMember.memberInfo(req.params.id);
        console.log("controller memberInfo: ",member);
        res.render("member/member_info",{member, username: req.session.username});
        }
    }

const process ={
    loginCheck : async (req,res) =>{
        console.log(req.body);
        const result = await ser.serMember.loginCheck( req.body );
        console.log("ctrl loginCK", result)

        if( result.re === 1){
            req.session.username = req.body.id;
            console.log("username: " , req.session.username )
        }
        res.send(result.msg);
    },
    Insert : (req, res) => {
        res.render("board/insert");
    },
    borModify :async (req,res)=>{
        console.log("borModify: ",req.body);
        const data = await ser.serBoard.borModify(req.body);
        res.send(data);
    },
    boardModify : async (req, res) => {
        const data = await ser.serBoard.content(req.params.num);
        console.log("ctrl mod", data);
        res.render("board/modify_form", {username: req.session.username, data});
    },
    boardDelete : async (req, res) => {
        console.log("ctr del", req.params);
        const data = await ser.serBoard.boardDelete(req.params.num);
        res.send(data);
    },

    join : async (req,res)=>{
        console.log("join : ", req.body );
        const msg = await ser.serMember.join(req.body);
        res.send(msg);
    },

    plantSearch : async (req,res)=>{
        
        //console.log("aaa",username);
        const result = await ser.serPlant.plantRegister();
        res.render("plant/plant_search",{result});
        //console.log(p_name);
        //res.render("myPage/search_list",{p_name});
    },
    getImg : (req,res)=>{
        fs.readdir("../img",(err,images)=>{
            console.log("비동기방식: ",images);
            res.render("plant/plant_search",{images});
        })
    },
    plantShow : async (req,res)=>{
        console.log("플랜드쇼 세션",req.session.username);
        console.log("플랜트쇼 피네임",req.params.p_name);
           
            const result = await ser.serPlant.plantShow(req.params.p_name);
            console.log("플랜트 결과:",result);
            console.log("플랜트 결과:",result.length);
          
            res.render("plant/plant_show",{username : req.session.username, result});
           
        
    },
    plantRegister : async (req,res) =>{
        const result = await ser.serPlant.plantRegister(req.body.p_name, req.session.username ); //식물 등록

        if(result == 1){
            
            res.render("main", {username : req.session.username});

        }else{
            
            res.render("plant/plant_search",{username : req.session.username});
        }
    },
    insert: async (req,res)=>{
        console.log("인서트 바디: ",req.body);
        
        const data = await ser.serBoard.insert(req.body,req.session.username);
       // console.log("boardWrite_ctrl: ",data);
        res.redirect("/board_list");
    },

    mypageBoard : async (req,res)=>{
        const data = await ser.serMember.mypageBoard(req.params.id);
        console.log("mypage ctrl:",data);
        console.log("게시물 세션", req.session.username);
        
        res.render("member/mypage_board",{data, username:req.session.username});
    },
    mypagePlant : async (req,res)=>{
        const data = await ser.serMember.mypagePlant(req.params.id);
        console.log("내식물리스트:",data);

        res.render("member/mypage_plant",{data, username:req.session.username});
    },
    memModify : async (req,res)=>{
        console.log("ctrl memModify: ",req.body.id);
        const msg = await ser.serMember.memModify(req.body);
        res.send(msg);
    },
    memberModify : async (req,res)=>{
    console.log("ctrl modify: ",req.query.id);
    //console.log("ctrl modify: ", req.params.id);
    const member = await ser.serMember.memberInfo(req.query.id);
    console.log("ctrl modify: ", member);
    res.render("member/member_modify",{member,username: req.session.username});
    },
    memberDelete : async (req,res)=>{
        console.log("del ctrl:",req.params.username);   
        const msg = await ser.serMember.memberDelete(req.params.username);
        req.session.destroy();
        res.send(msg);
    },
    plantDel : async (req,res)=>{
        console.log("plantDel ctrl",req.params.p_name);
        const msg = await ser.serPlant.plantDel(req.params.p_name,req.session.username);
        console.log("plantDel session:",req.session.username);
        res.send(msg);
    }
}
    

module.exports = {views, process}