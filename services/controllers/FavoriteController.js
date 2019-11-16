const models = require('../models')
const favorite = models.favorites
const manga = models.mangas

exports.getFavorite = async(req,res) => {
    const result = await favorite.findAll({
        where: {
            user_id:req.params.userId
        }, 
        include: [
            {
                model : manga,
                as: "mangas"
            },
        ]
    })
    res.send(result); 
}
exports.getDetailFavorite = async(req,res) => {
    const mangaId = req.params.mangaId
    const userId = req.params.userId
    const result = await favorite.findOne({
        where: {
            manga_id: mangaId,
            user_id: userId
        }
    })
    res.send(result)
}
exports.addFavorite = async (req,res) => {
    const dataFavorite = req.body
    const result = await favorite.create(dataFavorite)
    res.send(result)
}
exports.deleteFavorite = async (req,res) => {
    const favoriteId = req.params.favoriteId
    const dataFavorite = await favorite.destroy({
        where : {
            id:favoriteId
        }
    })
    res.send(favoriteId)
}