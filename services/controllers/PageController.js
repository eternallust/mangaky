const models = require('../models')
const page = models.pages

exports.getPage = async(req,res) => {
    const result = await page.findAll({
        where: {
            id:req.params.chapterId
        }
    })
    res.send(result); 
}
exports.addPage = async (req,res) => {
    const dataPage = req.body
    const result = await page.create(dataPage)
    res.send(result)
}
exports.updatePage = async (req,res) => {
    const pageId = req.params.pageId
    const data = req.body
    const result = await page.update(data,{
        where:{
            id : chapterId 
        }
    })
    res.send(data)
}
exports.deletePage = async (req,res) => {
    const pageId = req.params.pageId
    const dataPage = await page.destroy({
        where : {
            id:pageId
        }
    })
    res.send(pageId)
}