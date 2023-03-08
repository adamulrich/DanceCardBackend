const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: true
        },
        stakeId: {
            type: Number, required: true
        },
        wardId: {
            type: Number, required: true
        },
        parentName: {
            type: String
        },
        parentPhone: {
            type: Number
        },
        cardIsSigned: {
            type: Boolean, required: true
        },
        expirationDate: {
            type: Date, required: true
        },
        email: {
            type: String, required: true
        },
        phone: {
            type: Number
        },
        regionAdmin: {
            type: Boolean, required: true
        },
        regionId: {
            type: Number, required: true
        }
    },
    {
        toObject: {virtuals:true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        //toJSON: {virtuals:true} 
    }
);

userSchema.virtual('ward', {
    ref: 'ward',
    localField: 'wardId',
    foreignField: 'wardId',
    justOne: true // for many-to-1 relationships
});

userSchema.virtual('stake', {
    ref: 'stake',
    localField: 'stakeId',
    foreignField: 'stakeId',
    justOne: true // for many-to-1 relationships
});

userModel = mongoose.model("user", userSchema, 'user')
module.exports = {userModel}
