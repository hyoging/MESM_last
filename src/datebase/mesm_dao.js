const oracledb = require("oracledb");
const dbConfig = require("../../config/database/db_config");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const daoMember = {
   
    getmember : async ( id ) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from member_01 where id='${id}'`;
        let member;
        try{
            member = await con.execute(sql);
        }catch(err){
            console.log( err );
        }
        return member;
    },
    
    join : async ( body ) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = "insert into member_01 values(:id,:pwd,:name)";
        let result;
        console.log(result);
        try{
            result = await con.execute(sql, body);
        }catch(err){
            console.log(err)
        }
        return result;
    },
    memberInfo : async (id )=>{
        console.log("dao mypage:",id);
        let con = await oracledb.getConnection(dbConfig);
        const sql = `select * from member_01 where id ='${id}'`;
      
        let result;
        try {
            result = await con.execute(sql);  
            console.log("dao mypage sql",result);
        }catch(err){
             console.log(err);
        }
        return result.rows[0];
        },
        memModify : async( body )=>{
  
        const sql = `update member_01 set pw='${body.pw}',
                    name='${body.name}'
                    where id ='${body.id}'`;  
        let con =await oracledb.getConnection(dbConfig);
        let result =0;
        try{
           result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result;
    
    },
    memberDelete : async (id)=>{
        let con = await oracledb.getConnection(dbConfig);
        const sql1 = `delete from myplant where id='${id}'`;
        const sql2= `delete from member_01 where id='${id}'`;
        let result1, result;
        try{
            result1 = await con.execute(sql1);
            result = await con.execute(sql2);
            console.log("del dao:",result);
         }catch(err){
             console.log(err);
         }
         return result;
    },
    mypageBoard : async (id)=>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select post_num, title from board_01 where id ='${id}'`;
        let result;
        try{
            result = await con.execute(sql);
            console.log("mypageBoard",result);
        }catch(err){
            console.log(err)
        }
        return result.rows;
    },
    mypagePlant : async(id)=>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select p_name from myplant where id = '${id}'`;
        let result;
        try{
            result = await con.execute(sql);
            console.log("내식물보기 dao:",result);
        }catch(err){
            console.log(err)
        }
        return result.rows;
    }
}
const daoBoard={
    boardList : async () =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from board_01`;
        let result;
        try{
            result = await con.execute(sql);
            console.log("게시판 리스트dao",result.rows);
        }catch(err){
            console.log(err)
        }
        
        return result.rows;
    },
    content :  async (num)=>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from BOARD_01 where post_num = '${num}'`;
        const data = await con.execute(sql);
        return data;
    },
    insert : async (body,id)=>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `insert into board_01 values(BOARD_01_SEQ.NEXTVAL,'${id}','${body.title}','${body.content}',sysdate,0)`;
        let result;
        try {
            result = await con.execute(sql);
        }catch(err){
            console.log(err)
        }
    },
    upHit : async (title)=>{
        const con = await oracledb.getConnection(dbConfig);
        console.log("uphit dao",title);
        const sql = `update board_01 set count=count+1 where title = '${title}'`;
        await con.execute(sql); 
    },
    borModify : async (body) => {
        console.log("dao : ", body);
        const con = await oracledb.getConnection(dbConfig);
        const sql = `update board_01 set title='${body.title}', content='${body.content}' where post_num='${body.num}'`;
        let result;
        try {
            result = await con.execute(sql);
        }catch(err){
            console.log(err)
        }
        return result.rowsAffected;
    },
    boardDelete : async(num) => {
        const con= await oracledb.getConnection(dbConfig);
        const sql = `delete from board_01 where post_num=${num}`;
        let result;
        try {
            result = await con.execute(sql);
        }catch(err){
            console.log(err)
        }
        return result.rowsAffected;


    }
}
const daoPlant = {  
    plantMy : async (id)=>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select P_NAME from myplant where id = '${id}'`;
        try{
            result = await con.execute(sql);
           // console.log("dao 마이식물: ",result);
        }catch(err){
            console.log(err)
        }
        return result;
    },
    plantSearch : async (p_name)=>{
        console.log("dao", p_name)
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from plant where p_name like '%${p_name}%'`;

        let result;
             try{
                 result = await con.execute(sql);
             }catch(err){
             console.log(err)
             }
            return result.rows;
    }, 
    plantRegister : async ( pName,id ) =>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = `insert into myplant values ('${id}','${pName}')`;
    let result=0;
    console.log(result);
    try{
        result = await con.execute(sql);
        result = 1;
    }catch(err){
        console.log(err)
    }
    return result;
    },
    plantShow : async (pName) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from plant where P_NAME = '${pName}'`;
    try{
        result = await con.execute(sql);
        console.log("다오 플랜트쇼",result);
    }catch(err){
        console.log(err)
    }
    return result;
   },
   plantDel : async (p_name,id)=>{
    let con = await oracledb.getConnection(dbConfig);
    const sql = `delete from myplant where p_name ='${p_name}' and id='${id}'`;
    let result;
    try{
        result = await con.execute(sql);
        console.log("plantDel dao:",result);
     }catch(err){
         console.log(err);
     }
     return result.rowsAffected;
   }


}
module.exports = {daoMember,daoBoard,daoPlant};