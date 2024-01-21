const express = require('express');
const router = express.Router();
const db = require('../model/db');
const { where } = require('sequelize');

router.get('/', (req, res) => {
    res.render('index', {title: '타이틀'});
})

// 유저 생성
router.post('/createUser', async (req, res) => {
    const { user_id, password } = req.body;
    const checkExistUser = await db.users.findOne({where: {user_id}});

    if (checkExistUser) {
        return res.status(400).send({errorMessage: "이미 존재하는 아이디"})
    }
    await db.users.create({user_id, password})
    return res.send({message: '생성 성공'})
})

// 유저 상세 정보
router.get('/userDetail/:user_id', async (req, res) => {
    const user_id = req.params;
    const user = await db.users.findOne({where: user_id})

    return res.status(200).send(user);
})

// 유저 업데이트
router.put('/userUpdate/:user_id', async (req, res) => {
    const {user_id} = req.params;
    const checkExistUser = await db.users.findOne({where: {user_id}});

    if (!checkExistUser) {
        return res.status(400).send({errorMessage: "존재하지 않는 유저"})
    }

    const {password} = req.body
    await db.users.update({password}, {where:{user_id}})

    const updatedUser = await db.users.findOne({where: {user_id}})
    return res.status(200).send(updatedUser);
})

// 유저 삭제
router.delete('/userDelete/:user_id', async (req, res) => {
    const {user_id} = req.params;
    const checkExistUser = await db.users.findOne({where: {user_id}});

    if (!checkExistUser) {
        return res.status(400).send({errorMessage: "존재하지 않는 유저"})
    }

    const {password} = req.body
    if(password !== checkExistUser.password) {
        return res.status(400).send({errorMessage: "비밀번호가 틀렸습니다."})    
    }

    await db.users.destroy({where:{user_id}})

    return res.status(200).send({message: '삭제 완료'});
})

module.exports = router;