let asyncHnadler = (requestHnadler)=>{
    return (req,res,next) => {
        Promise.resolve(requestHnadler(req,res,next)).catch((error)=>next(error))
    }
}

module.exports =  asyncHnadler 