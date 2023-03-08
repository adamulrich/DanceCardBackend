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
        // if (await getPrivData(req.oidc.user.sub,'create')) {

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
        // } else {
        //     setHeaders(res, contentText);
        //     res.status(403).send("Incorrect permissions.");    
        // }
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


module.exports = { getUser, createUser } //, updateUser, deleteUser };
