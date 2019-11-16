const models = require('../models')
const chapter = models.chapters

exports.getChapter = async(req,res) => {
    const result = await chapter.findAll({
        where: {
            id:req.params.mangaId
        }
    })
    res.send(result); 
}
exports.addChapter = async (req,res) => {
    const dataChapter = req.body
    const result = await chapter.create(dataChapter)
    res.send(result)
}
exports.updateChapter = async (req,res) => {
    const chapterId = req.params.chapterId
    const data = req.body
    const result = await chapter.update(data,{
        where:{
            id : chapterId 
        }
    })
    res.send(data)
}
exports.deleteChapter = async (req,res) => {
    const chapterId = req.params.chapterId
    const dataManga = await chpater.destroy({
        where : {
            id:chapterId
        }
    })
    res.send(chapterId)
}