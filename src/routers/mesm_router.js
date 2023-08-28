const router = require("express").Router();

const mesmCtrl = require("../controller/mesm_ctrl");

// main + member
router.get("/", mesmCtrl.views.index);
router.get("/login",mesmCtrl.views.login);
router.get("/logout",mesmCtrl.views.logOut);
router.get("/main",mesmCtrl.views.main);
router.post("/join",mesmCtrl.process.join);
router.get("/join_form",mesmCtrl.views.join_form);
router.post("/login_check", mesmCtrl.process.loginCheck);


// mypage

router.get("/mypage", mesmCtrl.views.mypage);
router.get("/member_info/:id",mesmCtrl.views.memberInfo);
router.post("/mem_modify",mesmCtrl.process.memModify);
router.get("/member_modify",mesmCtrl.process.memberModify);
router.get("/mypage_plant/:id",mesmCtrl.process.mypagePlant);

router.get("/mypage_board/:id",mesmCtrl.process.mypageBoard);

router.get("/member_delete/:username",mesmCtrl.process.memberDelete);

//board

router.get("/board_list", mesmCtrl.views.boardList);
router.get("/content/:num",mesmCtrl.views.content);
router.get("/insert_form", mesmCtrl.views.insertForm);
router.post("/insert",mesmCtrl.process.insert);
router.post("/bor_modify",mesmCtrl.process.borModify);
router.get("/modify_form/:num", mesmCtrl.process.boardModify);
router.get("/board_delete/:num", mesmCtrl.process.boardDelete);


// plant
router.post("/main",mesmCtrl.process.plantRegister);

router.get("/plant_reg_form",mesmCtrl.views.plantRegForm);
router.get("/plant_search",mesmCtrl.process.plantSearch);
router.get("/plant_show/:p_name",mesmCtrl.process.plantShow);
router.get("/plant_my",mesmCtrl.views.plantMy);

router.get("/plant_delete/:p_name",mesmCtrl.process.plantDel);

module.exports = router;