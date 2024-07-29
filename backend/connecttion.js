
    require('dotenv').config();
    // console.log(process.env)
        const moongose = require('mongoose');
        // const password = encodeURIComponent("ObaxP0Y97py2ehWv");
        const connection_str = `mongodb+srv://jayeevishnu8:${process.env.password2}@cluster0.cqfy4t5.mongodb.net/?retryWrites=true&w=majority`;
            moongose.connect(connection_str, {
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
