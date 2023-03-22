const { auth } = require('express-oauth2-jwt-bearer');

function setHeaders(res, contentType) {
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173', 'http://localhost:5173', 'https://adorable-truffle-cb84e7.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
}

function isRegionAdmin(userPrivs, regionId) {
    return (userPrivs.isRegionAdmin && userPrivs.regionId == regionId)
}


const jwtCheck = auth({
  audience: 'http://localhost:5000',
  issuerBaseURL: 'https://dev-vukawrenb1tvjct0.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

module.exports = {setHeaders, isRegionAdmin, jwtCheck}
