const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: true
        },
        email: {
            type: String, required: true, unique: true, dropDups: true
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
            type: Date
        },
        regionAdmin: {
            type: Boolean, required: true
        },
        regionId: {
            type: Number, required: true
        },
        userSub: {
            type: String, required: true
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
    expirationDate: "2024-05-05T05:00:00.000+00:00",
    email: "sj@gmail.com",
    phone: "123-456-0000",
    regionAdmin: false,
    regionId: 1,
    userSub: "github/1234567890"
}

const userReturnExample = {
    name: "Sara Johnson",
    stakeId: 2,
    stakeName: "Kent, Washington",
    wardId: 1,
    wardName: "Pine Tree Ward",
    parentName: "Bobby Johnson",
    parentPhone: "123-456-7890",
    cardIsSigned: false,
    expirationDate: "05/05/2024",
    email: "sj@gmail.com",
    phone: "123-456-0000",
    regionAdmin: false,
    regionId: 1,
    userSub: "github/1234567890"
}

async function getUserPrivs(req) {
    let userPrivs = { regionId: 0, regionAdmin: false, sub: ''};
    if (req.oidc.isAuthenticated()) {
        userPrivs = await getPrivs(req.oidc.user.sub);
        userPrivs.sub = req.oidc.user.sub;
    }

    return userPrivs;
}

async function getPrivs(userId) {
    try {
        const returnValue = {};
        const userPrivs = await userModel.findOne({ userSub: userId });
        if (userPrivs != null) {
            returnValue.regionAdmin = userPrivs.regionAdmin;
            returnValue.regionId = userPrivs.regionId;
            return returnValue;
        } else {
            console.log("User not found.");
            return false;
        }
    
    } catch (error) {
        console.log(`${error}`)        
        return false;
    }
}
userModel = mongoose.model("user", userSchema, 'user')
module.exports = {userModel, userExample, userReturnExample, getUserPrivs}
