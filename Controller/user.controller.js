const db = require('../db');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async(req,res)=>{
    try {
        const id = uuid.v1();
        const {name,password,username,code} = req.body;
        const random = (Math.random() + 1).toString(36).substring(7).toUpperCase();
        //create password with code bcrypt
        const hashPass = await bcrypt.hash(password, 12);
        const sql_find_code = "SELECT * FROM user WHERE code = ?";
        db.query(sql_find_code,[code],(err,rows,fields)=>{
            if(err){
                return res.json({msg:err});
            }
            if(rows.length===0){
                const sqlRegister = 'INSERT INTO `user`(`id`,`name`,`username`,`password`,`code`,`introduced`,`spurlus`) VALUES(?,?,?,?,?,?,?)';
                db.query(sqlRegister,[id,name,username,hashPass,random,0,0],(err,rows,fields)=>{
                    if (err) {
                        return res.json({msg:err});
                    }else{
                        return res.json({msg:"Success"})
                    }
                })
            }else{
                //Plus money
                const money = rows[0].spurlus+50000;
                const sql_plus_money = "UPDATE user SET spurlus = ? WHERE id = ?";
                db.query(sql_plus_money,[money,rows[0].id]);
                const sqlRegister = 'INSERT INTO `user`(`id`,`name`,`username`,`password`,`code`,`introduced`,`spurlus`) VALUES(?,?,?,?,?,?,?)';
                db.query(sqlRegister,[id,name,username,hashPass,random,1,30000],(err,rowss,fields)=>{
                    if(err){
                        return res.json({msg:err});
                    }else{
                        console.log(rows[0].id);
                        const sql_add_reward = "INSERT INTO `reward` (`sourceId`,`targetId`) VALUES (?,?)";
                        db.query(sql_add_reward,[id,rows[0].id]);
                        return res.json({msg:"Success"})
                    }
                })
            }
        })
    }catch (error) {
        return res.status(500).json({ msg: error.message });
    } 
}
const login = (req,res)=>{
    try {
        const {username,password} = req.body;
        const sql = 'SELECT * FROM user WHERE username = ? ';
    
        db.query(sql,[username],async(err,rows,fields)=>{
            if (err) {
                return res.json({msg:err});
            }
            //Check account exist
            if(rows.length ===0 ){
                return res.status(422).json({
                    msg: "Invalid account",
                });
            }else{
                //Confirm password
                const passMatch = await bcrypt.compare(password,rows[0].password);
                if(!passMatch){
                    return res.status(422).json({
                        msg: "Incorrect password",
                    });
                }else{
                    const theToken = jwt.sign({id:rows[0].id},"the strong",{ expiresIn: '1d' });
                    return res.json({
                        msg:"Success",
                        token:theToken
                    });
                }
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const getUser = (req,res)=>{
    try {
        const {token} = req.body;
        if(token==null){
            return res.status(422).json({
                msg: "Please provide the token",
            });
        }
        const theToken = token;
        jwt.verify(theToken, "the strong",(err,decoded)=>{
            if(err){
                return res.json({msg:err})
            }else{
                const sql = 'SELECT id,name,username,code,introduced,spurlus,create_at,update_at FROM user WHERE id = ?';
                db.query(sql,[decoded.id],(err,rows,fields)=>{
                    if (err) {
                        return res.json({msg:err});
                    }else{
                        return res.json(rows);
                    }
                })
            }
        });
      
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
   
}

const checkUsername = (req,res)=>{
    const {username} = req.body;
    const sql = 'SELECT * FROM user WHERE username = ? ';
    db.query(sql,[username],async(err,rows,fields)=>{
        //Check email exist ?
        if(rows.length > 0 ){
            return res.json({
                msg: "The Username already in use",
            });
        }
        else{
            return res.json({msg: "Continue register"})
        }
    }
    )
}

const updateSpurlus = (req, res)=>{
    const {idUser, spurlus} = req.body;
    
    const sql_plus_money = "UPDATE user SET spurlus = ? WHERE id = ?";
    db.query(sql_plus_money,[spurlus,idUser],(err,rows)=>{
        if(err){
            return res.json({msg: err})
        }else{
            return res.json({msg: 'Success'})
        }
    })
}
module.exports = {
    checkUsername,
    register,
    login,
    getUser,
    updateSpurlus
}