const db = require('../db')

const getNews = (req,res)=>{
    const sql = "SELECT * FROM news"
    db.query(sql,(err, rows)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}
const getImages = (req, res)=>{
    const sql = 'SELECT news.id AS id, news.image AS image FROM news LiMIT 5'
    db.query(sql,(err, rows)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}
const getNewsId = (req, res)=>{
    const {idNews} = req.body;
    // console.log(idNews)
    const sql = 'SELECT * FROM news WHERE id = ?'
    db.query(sql,[idNews],(err, rows)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const Search = (req, res)=>{
    const {text} = req.body;
    const sql = `SELECT * FROM news WHERE title LIKE "%${text}%"`;
    db.query(sql,(err,rows)=>{
        if(err){
            return res.json({msg: err})
        }else{
            console.log(rows);
            return res.json({msg: rows})
        }
    })
    console.log(text);
}



module.exports = {
    getNews,
    getImages,
    getNewsId,
    Search
}