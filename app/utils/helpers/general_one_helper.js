/* centalizing all the manual queries at one place */
module.exports = {
    /*getSingleData : async (Collection, query) =>{
        return new Promise((resolve, reject) =>{
            Collection.findOne(query,(err,result)=>{
                (err ? reject(err) : resolve(result))
            })
        })
    },
    */
    getSingleData : async (Collection, query,fields=null) =>{
        return new Promise((resolve, reject) =>{
            Collection.findOne(query,fields,(err,result)=>{
                (err ? reject(err) : resolve(result))
            })
        })
    },
    getSingleDataWithPopulate : async (Collection, query, population,main_fields=null,populate_fields=null) =>{
        return new Promise((resolve, reject) =>{
            Collection.findOne(query,main_fields).populate(population,populate_fields).exec((err,result)=>{
                (err ? reject(err) : resolve(result))
            })
        })
    },
    getManyData : async (Collection, query,fields=null) =>{
        return new Promise((resolve, reject) =>{
            Collection.find(query,fields,(err,result)=>{
                (err ? reject(err) : resolve(result))
            })
        })
    },
    getManyDataWithPopulate : async (Collection, query, population,main_fields=null,populate_fields=null) =>{
        return new Promise((resolve, reject) =>{
            Collection.find(query,main_fields).populate(population,populate_fields).exec((err,result)=>{
                (err ? reject(err) : resolve(result))
            })
        })
    }
}