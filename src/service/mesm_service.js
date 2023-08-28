const mesmDAO = require("../datebase/mesm_dao");

const  getMessage = (msg, url) =>{
    return `<script>alert('${msg}'); location.href="${url}";</script>`;
}


const serMember ={
    // main : async (id)=>{
    //     const member = await mesmDAO.daoPlant.plantMy(id);
    //     let result;
    //     if(member.rows.length >= 1){
    //         result = 1;
    //     }else{
    //         result = 0;
    //     }
    //     return result;
    // },
    getmember : async ( id ) =>{
    const mem = await mesmDAO.daoMember.getmember( id );
    return mem.rows[0];
    },
    loginCheck : async ( body )=>{
        console.log("ser logck", body.id);
        let member = await mesmDAO.daoMember.getmember( body.id );
        let msg="", url="", msgPack = {};
        if(member.rows.length == 1){
            member = member.rows[0];
            if(member.PW === body.pwd){
                msg = `${member.NAME}님 환영합니다`;
                url = "/main";
                msgPack.re = 1;
            }else{
                msg = "비밀번호가 틀렸습니다!!";
                url = '/login';
            }
        }else{
            msg = "존재하지 않는 아이디입니다ㅠ";
            url = "/";
        }
        msgPack.msg = getMessage(msg, url);
        return msgPack;
    },
    join : async ( body )=>{
        let result = await mesmDAO.daoMember.join( body );
        let msg="", url="";
        console.log("result : ", result);
        if(result !== undefined){
            msg = `${body.name}님 회원가입 성공^^`;
            url = "/login";
        }else{
            msg = "존재하는 아이디입니다.";
            url = "/";
        }
        return getMessage(msg, url);
    },

    memberInfo : async (id) =>{
        const result = await mesmDAO.daoMember.memberInfo( id );
        console.log("ser memInfo:", result );
        return result;
    
    },
    memModify : async (body)=>{
        const result = await mesmDAO.daoMember.memModify(body);
        let msg="", url="";
        if(result ==0) {
            msg="문제발생";
            url ="/member_modify?id="+body.id;
        }else{
            msg="수정 성공";
            url="/member_info/"+body.id;
        }
        return getMessage(msg,url);
    },
    memberDelete : async (id)=>{
        console.log("del ser:",id);
        const result =await mesmDAO.daoMember.memberDelete( id );
        let msg="", url="";
        if(result ==0) {
            msg="문제발생";
            url ="/mypage";
        }else{
            msg="삭제 성공! 처음화면으로 돌아갑니다";
            url="/";
        }
        
        return getMessage(msg,url);
    },
    mypageBoard  : async (id)=>{
        console.log("myBoard ID:",id);
        const result = await mesmDAO.daoMember.mypageBoard(id);
        console.log("myBoard:",result);
        return result;

    },
    mypagePlant : async (id)=>{
        console.log("myplant id",id);
        const result = await mesmDAO.daoMember.mypagePlant(id);
        console.log("myplant :",result);
        return result;
    }
}
const serBoard = {
    boardList : async ()=>{
        const list = await mesmDAO.daoBoard.boardList();
       // console.log("게시판 ser  : ", list); 
        return list;
    },
    content : async (num) =>{
        await serBoard.upHit(num);
        const data = await mesmDAO.daoBoard.content(num);
        console.log("ser_content :",data);
        return data.rows[0];
    },
    insert : async ( body , id)=>{
        const result = await mesmDAO.daoBoard.insert(body,id);
        //console.log("write ser :",result);
        //return result;
    },
    upHit : (num)=>{
        const result = mesmDAO.daoBoard.upHit(num);
        console.log("upHit ser: ",result);
        return result;
    },
    borModify : async (body) => {
        console.log("ser modify", body);
        const result = await mesmDAO.daoBoard.borModify(body);
        console.log(result);
        let msg="",url="";
        if(result ==0){
            msg="문제 발생";
            url="/content/"+body.num;
        }else{
            msg="등록 성공";
            url="/board_list";
        }
        const msgPack =getMessage(msg,url);
        return msgPack;
    },
    boardDelete : async(num)=> {
        const result = await mesmDAO.daoBoard.boardDelete(num);
        console.log(result);
        let msg="",url="";
        if(result ==0){
            msg="문제 발생";
            url="/content?num="+num;
        }else{
            msg="삭제 성공";
            url="/board_list";
        }
        const msgPack =getMessage(msg,url);
        return msgPack;
    }

}

const serPlant = {
    plantMy : async (id,p_name) =>{
        let result = await mesmDAO.daoPlant.plantMy(id,p_name);
        //console.log("플랜트마이 ser:",result);
        return result.rows;
    },
    plantRegister : async (pName,id)=>{
        console.log("ser plantRegister:",id);
        //console.log("plantR : ",username)
        const result = await mesmDAO.daoPlant.plantRegister( pName,id );
        console.log("ser plantRegister2", result);
        return result;
    },
    plantSearch : async ( p_name )=>{
        
        const searchList =  await mesmDAO.daoPlant.plantSearch(p_name);
        console.log("ser searchList : ", searchList)
        let msg='', url='';
        if(searchList.length === 0){
            msg ="해당하는 식물 정보가 없습니다.";
            url = "/plant_search";
        }
        else{
            // 이부분은 프롬프트에만 출력됨 
            msg = p_name+"으로 검색한 결과입니다.";
            url="/plant_search/"+p_name;
        }
        
        const msgPack = getMessage(msg,url);
        return {search: searchList, msgPack: msgPack};
    },
    plantShow : async (pName) => {
        console.log("ser listInfo", pName)
        const list = await mesmDAO.daoPlant.plantShow(pName);
        console.log("ser listInfo2", list)
        return list.rows;
    },
    plantDel : async (p_name,id)=>{
        console.log("plantDel ser:",p_name,id);
        const result =await mesmDAO.daoPlant.plantDel( p_name,id);
        let msg="", url="";
        if(result ==0) {
            msg="문제발생";
            url ="/mypage_plant/"+id;
        }else{
            msg="삭제 성공";
            url="/mypage_plant/"+id;
        }
        
        return getMessage(msg,url);
}
}



module.exports = {serMember,serPlant,serBoard,getMessage}