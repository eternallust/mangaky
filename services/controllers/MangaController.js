const sequelize = require('sequelize')
const models = require('../models')
const manga = models.mangas
const user = models.users
const Op = sequelize.Op

exports.show = async(req,res) =>{
    const result = await manga.findAll()
    res.send(result)
}
exports.getManga = async(req,res) => {
    const result = await manga.findOne({
        where: {
            id:req.params.mangaId
        },
        include: [
            {
                model : user,
                as: "user"
            },
        ]
    })
    res.send(result); 
}
exports.searchManga = async(req,res) => {
    const result = await manga.findAll({
        where: {
            title:{[Op.like]:`%${req.params.title}%`}
        }
    })
    res.send(result);
}
exports.addManga = async (req,res) => {
    const {title,user_id} = req.body
    const result = await manga.create({
        title,
        cover: req.file.path,
        status: 1,
        user_id
    })
    res.send(result)
}
exports.updateManga = async (req,res) => {
    const mangaId = req.params.mangaId
    const data = req.body
    const result = await manga.update(data,{
        where:{
            id : mangaId 
        }
    })
    res.send(data)
}
exports.deleteManga = async (req,res) => {
    const mangaId = req.params.mangaId
    const dataManga = await manga.destroy({
        where : {
            id:mangaId
        }
    })
    res.send(mangaId)
}
exports.myCreation = async (req,res) => {
    const userId = req.params.userId
    const result = await manga.findAll({
        where : {
            user_id:userId
        }
    })
    res.send(result)
}

