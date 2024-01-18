const moongose  = require('mongoose');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const UserSchema =  moongose.Schema({
    name : {
        type:String,
        required:[true,'is required']
    },
    Email:{
        type:String,
        required:[true,"email is require"],
        unique:true,
        Index:true,
        Validate:{
            validator:function(str){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
            },
            message:(props)=>{
                `${props.value}  is not valid email` 
            }
        }},
        password:{
            type:String,
            required:[true,'is required']
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        cart:{
            type:Object,
            default:{
                total:0,
                count:0,
                products:{},
            }
        },
        address:{
            type:moongose.Schema.Types.ObjectId,
            ref:"Address"
        }

},{minimize:false})
UserSchema.statics.findbycredentials =async function(email,password){
const user = await User.findOne({Email:email});
if(!user) throw new Error('Invalid crendiatal');
const checkpassword = await bcrypt.compare(password,user.password);
if(checkpassword) return user;
throw new Error('Inavalid crendaital');
}
UserSchema.methods.toJson = function(){
    const user = this;
    const userobj = user.toObject();
    delete userobj.password ;
    delete userobj.notification ;
    delete userobj.orders;
    return userobj;
}
// Pre middleware functions are executed one after another, when each middleware calls next
// post middleware are executed after the hooked method and all of its pre middleware have completed.
//before saving hash the password
UserSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10 ,(err,salt)=>{
        if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) {return next(err);}
            user.password =hash;
            next();
        })
    });
})
//when we remove the user we remove its orders
UserSchema.pre('remove',function(next){
    this.model('Orders').remove({owner:this._id}),next();
})
const User = moongose.model('Users' ,UserSchema);
module.exports = User;