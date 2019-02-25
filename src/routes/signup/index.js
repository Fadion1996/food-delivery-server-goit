const qs = require('querystring');
const saveUser = user => {
    debugger

    
    // res.send(data);
  // получить файл с юзером
  // найти путь папки users
  // сохранить туда файл
};

const signupRoute = (request, response) => {
  // Взять данные что пришли

  if (request.method === 'POST') {
    let body = '';
    debugger

    request.on('data', data => {
        body = body + data;
        debugger

        const user = {
            username: user.body.username,
            telephone: user.body.telephone,
            password:  user.body.password,
            email: user.body.email,
            success: true
        };

        console.log(user);

      console.log('Incoming data!!!!');
    });

    request.on('end', () => {
      const post = qs.parse(body);
      console.log(post);
    });
  }

  // Взять username с данных, сохранить в переменную

  // Сохраняем данные в <username>.json

  // Сохранить <username>.json в папку users

  // Отправляем файл в ответе с данными юзера
  // использовать response
};

module.exports = signupRoute;