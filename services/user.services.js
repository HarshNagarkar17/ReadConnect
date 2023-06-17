const {User} = require('../models');


const createUser = async(username, email, password) => {
    if(await User.isEmailTaken(email))
        throw new Error("email already exist");
    return User.create({username, email, password});
}

const createAdmin = async(username, email, password) => {
    if(await User.isEmailTaken(email))
        throw new Error("Email already in use");
    return User.create({username, email, password, isAdmin:true, verified:true});
}

const updateUserAfterVerify = async(user) => {
    if(!(await getUserbyId(user.id)))
        throw new Error("No user found to update");
    await User.findOneAndUpdate({_id:user.id}, {verified:true});
}

const isUserAdmin = async (id) => {
    const user = await getUserbyId(id);
    if (!user.isAdmin)
      throw new Error("User is not an admin");
    return true;
  }

const getUserbyEmail = (email) => {
    return User.findOne({email});
}

const getUserbyId = (_id) => {
    return User.findById({_id});
}
module.exports = {getUserbyEmail, createUser, getUserbyId,
    updateUserAfterVerify, createAdmin, isUserAdmin};
