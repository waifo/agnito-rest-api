const Users = require("./users.route");

const addUser = (userProps)=>{
    const user = new Users(userProps);
    return user.save();
}

const findUser = ()=>{
    const findByEmail = (email)=>{
        return Users.findOne({email:email})
    }
    const findAll = ()=>{
        return Users.find({})
    }
    
    const findById = (_id)=>{
        return Users.findById(_id)
    }
}

const updateUser = (_id,userProps) =>{
    return Users.update({_id},userProps);
}

module.exports = {addUser,findUser,updateUser}