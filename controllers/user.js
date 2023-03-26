const ObjectId = require('mongodb').ObjectId;
const { default: mongoose } = require('mongoose');
const { setHeaders } = require('./utils');
const contentText = 'text/plain';
const contentJson = 'application/json';

const user = require('../models/user').userModel;
const stake = require('../models/stake').stakeModel;
const ward = require('../models/ward').wardModel

async function getUser(req, res) {
    
    const userEmail = req.params.email;

    try {
        
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
        }

    } catch (error) {
        setHeaders(res, contentText);
        res.status(500).send(`${error}`);
    }
    
}

async function createUser(req, res) {
    try {

        
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
                res.status(201).send(
                    {   
                        newUser: newUser['name'],
                        email: newUser['email']
                    });

            // catch unknown errors
            } catch (error) {
                setHeaders(res, contentText);
                res.status(400).send(`${error}`);
                return;
            }
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}


async function updateUser(req, res) {
    try {

        

            //get new user data from request object
            try {
                const userEmail = req.params.email;
                const updatedUser = req.body;
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
                let matchedCount = 0;
                if (result) {
                    modifiedCount = result.modifiedCount;
                    matchedCount = result.matchedCount;
                }
                // if we don't have a result or the modifiedCount is 0 set the status code to 404
                if (result === null || modifiedCount == 0 ) {
                    if (matchedCount == 0) {
                        statusCode = 404;
                    } else {
                        statusCode = 417;
                    }
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
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}


async function deleteUser(req, res) {
    
    const userEmail = req.params.email;

    try {
            let result = {};
            
            try {
                //get user data from model
                result = await user.deleteOne({ email: {$eq: userEmail}});
                console.log(result);
            } catch (error) {
                setHeaders(res, contentText);
                res.status(422).send(`Bad data. ${error}`);
                return;
            }
            // if deletedCount is 0 set the status code to 404
            let statusCode = 0;
            if (result.deletedCount == 0) {
                statusCode = 404
            } else {
                statusCode = 200
            }
            setHeaders(res, contentText);
            res.status(statusCode).send(result);
                    // failed authorization for user

    }
    catch (error) {
        setHeaders(res, contentText);
        res.status(500).send(`${error}`);
    }
    
}


// sets the headers for the response

module.exports = { getUser, createUser, updateUser, deleteUser };
