const db = require('../db')

const getMission = (req, res)=>{
    const {idUser} = req.body;
    console.log(idUser);
    const sql = 'SELECT mission.* FROM mission LEFT JOIN mission_complete ON mission_complete.idMission=mission.id WHERE mission.id NOT IN (SELECT mission_complete.idMission FROM mission_complete WHERE mission_complete.idUser= ?) ORDER BY mission.create_at LIMIT 5';
    db.query(sql,[idUser],(err, rows)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}
const AddMissionComplete = (req, res)=>{
    const {idMission, idUser, spurlus} = req.body;
    // console.log(idMission,'...',idUser,'.....',spurlus)
    const sql = "INSERT INTO `mission_complete` (`idUser`, `idMission`) VALUES (?,?)";
    db.query(sql,[idUser,idMission],(err, rows)=>{
        if(err){

            return res.json({msg: err})
        }else{
            const sql_plus_money = "UPDATE user SET spurlus = ? WHERE id = ?";
            db.query(sql_plus_money,[spurlus,idUser],(errr, rows)=>{
                if(errr){

                    return res.json({msg: errr})
                }else{
                    return res.json({msg: 'Success'})
                }
            });  
        }
    })

}
module.exports ={
    getMission,
    AddMissionComplete
}