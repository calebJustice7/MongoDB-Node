const User = require("../models/userModel");

class UserRepository{
    constructor(model) {
        this.model = model;
    }
    
    create(obj) {
        const User = new this.model(obj);
        return User.save();
    }
    findById(id) {
        return this.model.find({'_id': id})
    }
    findByFirst(first) {
        return this.model.find({first: first})
    }
    findByLast(last) {
        return this.model.find({last: last})
    }
    findAll() {
        return this.model.find()
    }
    deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }
    updateById(id, object) {
        const query = { "_id": id};
        return this.model.findOneAndUpdate(query, {$set: { 
            userName: object.userName,
            first: object.first,
            last: object.last,
            email: object.email,
            age: object.age
        }}, {new: false})
    }
    sortAZ() {
        return this.model.find().sort({userName: 1});
    }
    sortZA() {
        return this.model.find().sort({userName: -1});
    }
    searchFirst(first) {
        return this.model.find({first: first});
    }
    searchLast(last) {
        return this.model.find({last: last});
    }
}

module.exports = new UserRepository(User);