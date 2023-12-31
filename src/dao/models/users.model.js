import mongoose from 'mongoose';

const collectionUsers = 'users';
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {type: String, unique: true},
    age: Number,
    password: String,
    role: {type: String, default: 'user'},
    cart: {
        _id: {type: String, unique: true, ref: 'carts'},
        status: {type: String, default: 'open'}
    }
});

const autoPopulateLead = function (next) {
    this.populate('cart._id');
    next();
};

userSchema.pre('save', autoPopulateLead).pre('find', function (next) {
    this.populate('cart._id'), next();
});

const userModel = mongoose.model(collectionUsers, userSchema);
export default userModel;