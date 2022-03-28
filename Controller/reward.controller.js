const db = require('../db');

const getFriendIntroduced = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT user.id,user.name,user.username FROM reward INNER JOIN user ON user.id=reward.sourceId WHERE reward.targetId=?";
    db.query(sql,[idUser],(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

module.exports = {
    getFriendIntroduced
}
