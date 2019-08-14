const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UsersSchema= new Schema({
    id:Number,
    email:{type:String,unique:true,lowercase:true},
    password:String,
    firstName:String,
    lastName:String,
    userName:String,
    age:String,
    dob:Date,
    contactNo:Number,
    image:String,
    geographicLocation:[],
    enrolmentDetails:[],
    isOnline:{type:Boolean,default:false},
    isEmailVerified:{type:Boolean,default:false}

},{ autoIndex: false });


//On Save Hook, encrypt password
//Before saving a model,run this function

UsersSchema.pre('save',function(next){
    //get access to users model
    const user = this;

    //generate a salt
    bcrypt.genSalt(10,function(err,salt){
        if(err) return next(err);

        //hash (encrypt) our password using salt
        bcrypt.hash(user.password,salt,null,function(err,hash){
            if(err) return next(err);

            //overwrite plaint text password with encrypted password
            user.password=hash;
            next();
        })
    })
})

UsersSchema.methods.comparePassword = function(candidatePassword,callback){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return callback(err);

        callback(null,isMatch);
    })
}

module.exports = mongoose.model('users',UsersSchema);
// const UsersModelClass = mongoose.model('users',UsersSchema);

// module.exports = UsersModelClass;