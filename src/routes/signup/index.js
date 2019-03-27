const fs = require('fs');
const path = require('path');
const util = require('util');

const usersFolder = path.resolve(__dirname, '../../../', 'db/users');

// PROMISIFY function example
//
// const writeFile = (src, content) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(src, content, resolve);
//   });
// };

const writeFile = util.promisify(fs.writeFile);

const saveNewUser = (data) => {
    const src = path.resolve('./src/db/users', 'all-users.json');
    const dataStr = JSON.stringify(data);

    return writeFile(src, dataStr);
};

const createUser = (request, response) => {
    const user = request.body;
    const userData =  { ...user, id: Math.random() };

    const sendResponse = () => {
        response.json({
            status: 'success',
            user: userData
        });
    };

    const sendError = () => {
        response.status(400);
        response.json({
            error: 'user was not saved'
        });
    };

    saveNewUser(userData)
        .then(sendResponse)
        .catch(sendError);

};

module.exports = createUser;