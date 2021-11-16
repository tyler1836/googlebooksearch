const { AuthenticationError } = require('apollo-server-express');
const {signToken} = require('../utils/auth');
const { User, Book } = require('../models');

const resolvers = {
    Mutation: {
        addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      },
        login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { token, user };
        },
        saveBook: async (parent, {bookData}, context) =>{
            if(context.user){
                 const updatedUser = await User.findByIdAndUpdate(
                     {_id: context.user._id},
                     {$push: {saveBook: bookData}},
                     {new: true}
                 );
                 return updatedUser; 
            }
        }
    }
}

module.exports = resolvers;