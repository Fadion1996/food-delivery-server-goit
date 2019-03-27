const path = require('path');
const fs = require('fs');

const getUserFromDb = (id) => {

    const src = path.join(__dirname, '../../db/', 'users', 'all-users.json');
    let data = fs.readFileSync(src);
    let parseData = JSON.parse(data);
    if (parseFloat(id) === parseData.id) {
        return parseData
    } else {
        return null
    }
};

const getUser = (request, response) => {
    const id = request.params.id;

    response.set("Content-Type", "application/json");

    response.status(200);
    let user = getUserFromDb(id);
    user ?
        response.json({
            status: 'success',
            user: user
        }) :
        response.json({
            status: 'not found'
        });
};

module.exports = getUser;