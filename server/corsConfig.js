
//----------------------------------------------------
//  ALLOW CROSS DOMAIN REQUESTS
//----------------------------------------------------
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization')

  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
}

//----------------------------------------------------
//  CONFIGURE THE APPLICATION TO ALLOW CROSS DOMAIN?
//----------------------------------------------------
const configureCors = (app) => {
  app.use(allowCrossDomain)  
  console.log('now configured to allow cross domain requests')
}

//----------------------------------------------------
//  EXPORTS
//----------------------------------------------------
module.exports = (app) => {
  configureCors(app)
}