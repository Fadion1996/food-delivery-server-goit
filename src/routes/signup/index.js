const qs = require('querystring');
const fs = require("fs");
let path = '';

const saveUser = user => {
  let dir = './src/db/users/';
  !fs.existsSync(dir) && fs.mkdirSync(dir);

  path = `./src/db/users/${user.user.username}.txt`;
  fs.writeFile(path, JSON.stringify(user), ()=> {
      console.log(`Write file: ${user.user.username}.txt`);
  });
  
};

const signupRoute = (request, response) => {

  if (request.method === 'POST') {
    let body = '';
    request.on('data', data => {
      body = body + data;
      const parseBody = JSON.parse(body);
      
      const result = {
        status: 'success',
        user: {
          username: parseBody.username,
          telephone: parseBody.telephone,
          password:  parseBody.password,
          email: parseBody.email,
        }
      };
      saveUser(result);
      responseUser(result);
    });

    request.on('end', () => {
      const post = qs.parse(body);
    });

    
  }

  responseUser = (userData) => {
    const userName = userData.user.username;
    fs.writeFile(`./src/db/users/${userName}.json`, JSON.stringify(userData), (err, data) => {
      console.log(`Write file: ${userName}.json`);
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(JSON.stringify(userData));
    })
  }
    
};

module.exports = signupRoute;