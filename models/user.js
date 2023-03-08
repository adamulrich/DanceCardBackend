const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: true
        },
        email: {
            type: String, required: true
        },
        phone: {
            type: String
        },
        parentName: {
            type: String
        },
        parentPhone: {
            type: String
        },
        wardId: {
            type: Number, required: true
        },
        stakeId: {
            type: Number, required: true
        },
        cardIsSigned: {
            type: Boolean, required: true
        },
        expirationDate: {
            type: Date, required: true
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

const userExample = {
    name: "Sara Johnson",
    stakeId: 2,
    wardId: 1,
    parentName: "Bobby Johnson",
    parentPhone: "123-456-7890",
    cardIsSigned: false,
    expirationDate: "05/05/2024",
    email: "sj@gmail.com",
    phone: "123-456-0000",
    regionAdmin: false,
    regionId: 1
}


userModel = mongoose.model("user", userSchema, 'user')
module.exports = {userModel, userExample}
