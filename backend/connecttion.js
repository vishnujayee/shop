
    require('dotenv').config();
    // console.log(process.env)
        const moongose = require('mongoose');
        const connection_str = "mongodb+srv://ecom:ecomproject@cluster0.xqjwtmc.mongodb.net/?retryWrites=true&w=majority";
            moongose.connect(process.env.Mongo_local_host, {
                useNewUrlParser: true,
                // useFindAndModify: false,
                
                useUnifiedTopology: true
            }).then(() => { console.log("connected to mogodb") }).catch((error) => {
                console.log("some error occur in connecting mongodb")
            });
            moongose.connection.on('error', err => {
                console.log(err);
            })
            console.log(moongose.connection.readyState);
        
        module.exports = module;
            
        
//ecomproject
