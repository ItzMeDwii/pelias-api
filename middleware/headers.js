var pkg = require('../package');

function middleware(req, res, next){
  res.header('Charset','utf8');
  res.header('Cache-Control','public');
  res.header('Server', 'Pelias/'+pkg.version);
  res.header('X-Powered-By', 'pelias');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
}

module.exports = middleware;
