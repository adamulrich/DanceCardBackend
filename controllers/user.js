const ObjectId = require('mongodb').ObjectId;
const { default: mongoose } = require('mongoose');

const contentText = 'text/plain';
const contentJson = 'application/json';

const user = require('../models/user').userModel;
const stake = require('../models/stake').stakeModel;
const ward = require('../models/ward').wardModel

async function getUser(req, res) {
    const userEmail = req.params.email;

    try {
        //get privs and check to see if they are an admin, or the user, or this is a test
        let userPrivs = { regionId: 0, regionAdmin: false};
        let userSub = '';
        console.log(req.oidc.isAuthenticated());
        if (req.oidc.isAuthenticated()) {
            console.log(req.oidc.user.sub);
            userPrivs = await getPrivs(req.oidc.user.sub);
            userSub = req.oidc.user.sub;
        }

        //get user data from model
        const result = await user.findOne({ 'email': userEmail })
        .populate('stake')
        .populate('ward'); 
        // get stake and ward data and append
        
        // no result - not a valid id
        if (result == null || result.length == 0) {
            setHeaders(res, contentText);
            res.status(404).send(result);
        } else {

            if ( userSub == result.userSub ||
                (userPrivs.regionAdmin && result.regionId == userPrivs.regionId) ||
                process.env.ENV_DEV) {

                    //return data
                setHeaders(res, contentJson);
                //attach stake and ward data
                const returnUser = {};
                returnUser.email = result.email;
                returnUser.name = result.name;
                returnUser.phone = result.phone;
                returnUser.regionId = result.regionId;
                returnUser.regionAdmin = result.regionAdmin;
                returnUser.cardIsSigned = result.cardIsSigned;
                returnUser.expirationDate = result.expirationDate;
                returnUser.parentName = result.parentName;
                returnUser.parentPhone = result.parentPhone;
                returnUser.stakeId = result.stakeId;
                returnUser.stakeName = result.stake.name;
                returnUser.wardId = result.wardId;
                returnUser.wardName = result.ward.name;
                res.status(200).json(returnUser);
            } else {
                res.status(401).send("Not authenticated.");
            }
        }

    } catch (error) {
        setHeaders(res, contentText);
        res.status(500).send(`${error}`);
    }
    
}

async function createUser(req, res) {
    try {

        // if they are an admin, or they are creating an account with the currently logged in user
        // or this is a test
        let userPrivs = { regionId: 0, regionAdmin: false};
        let userSub = '';
        console
        if (req.oidc.isAuthenticated()) {
            console.log(`sub: ${req.oidc.user.sub}`);
            userPrivs = await getPrivs(req.oidc.user.sub);
            userSub = req.oidc.user.sub;
        }

        if (userSub == req.body.userSub ||
            (userPrivs.regionAdmin && req.body.regionId == userPrivs.regionId) ||
            process.env.ENV_DEV) {

            //get new user data from request object
            try {
                const newUser = new user(req.body);

                // create user in database
                try {
                    await newUser.save();

                // failed to save
                } catch (error) {
                    setHeaders(res, contentText);
                    res.status(422).send(`Bad data. ${error}`);
                    return;
                }
            
                // success
                setHeaders(res, contentText);
                res.status(201).send(`New User: ${newUser['name']}, email: ${newUser['email']}`);

            // catch unknown errors
            } catch (error) {
                setHeaders(res, contentText);
                res.status(400).send(`${error}`);
                return;
            }
        // failed authorization for user
        } else {
            setHeaders(res, contentText);
            res.status(403).send("Incorrect permissions.");    
        }
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}


async function UpdateUser(req, res) {
    try {

        // if they are an admin, or they are creating an account with the currently logged in user
        if (await isAdmin(req.oidc.user.sub) || process.env.ENV_DEV) {

            //get new user data from request object
            try {
                const userEmail = req.params.email;
                const uupdatedUser = req.body;
                let result = null;

                // create user in database
                try {
                    result = await user.updateOne
                        ({ email: { $eq: userEmail } },
                        updatedUser,
                            { runValidators: true });

                // failed to save
                } catch (error) {
                    setHeaders(res, contentText);
                    res.status(422).send(`Bad data. ${error}`);
                    return;
                }
            
                let statusCode = 0;
                let modifiedCount = 0;
                if (result) {
                    modifiedCount = result.modifiedCount
                }
                // if we don't have a result or the modifiedCount is 0 set the status code to 404
                if (result === null || modifiedCount == 0 ) {
                    statusCode = 404
                } else {
                    statusCode = 200
                }
                setHeaders(res, contentJson);
                res.status(statusCode).send(result);
                // catch unknown errors
            } catch (error) {
                setHeaders(res, contentText);
                res.status(400).send(`${error}`);
                return;
            }
        // failed authorization for user
        } else {
            setHeaders(res, contentText);
            res.status(403).send("Incorrect permissions.");    
        }
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}



// sets the headers for the response
function setHeaders(res, contentType) {
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
}

async function getPrivs(userId) {
    try {
        const returnValue = [];
        const userPrivs = await user.findOne({ userSub: userId });
        if (userPrivs != null) {
            returnValue.regionAdmin = userPrivs.regionAdmin;
            returnValue.regionId = userPrivs.regionId;
            return returnValue
        } else {
            console.log("User not found.");
            return false;
        }
    
    } catch (error) {
        console.log(`${error}`)        
        return false;
    }
}

module.exports = { getUser, createUser } //, updateUser, deleteUser };
