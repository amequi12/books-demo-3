/* eslint-disable no-console */
// eslint-disable-next-line no-undef
const jsonServer = require('json-server')
// eslint-disable-next-line no-undef
const jwt = require("jsonwebtoken");
// eslint-disable-next-line no-undef
const crypto = require('crypto');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const secretKey = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';
const hashingSecret = "f844b09ff50c";

const generateAccessToken = (userData) => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(userData, secretKey, { expiresIn: '1800s' });
}

// собираем ошибки
const getErrors = (errorsToSend) => {
  let errors = [];
  if (errorsToSend && Array.isArray(errorsToSend)) {
    errors = [...errorsToSend];
  }

  return {
    errors
  };
};

// формируем ошибку
const getError = (title, detail, status, pathToAttribute) => {
  let errors = [];
  errors.push({
    title,
    detail,
    status,
    source: pathToAttribute ? { pointer: pathToAttribute } : null
  });

  return getErrors(errors);
};

// ошибка код 401
const getUnauthorizedError = () => getError('Login', 'You are not authorized, please log in', 401, null);
// ошибка код 403
const getForbiddenError = () => getError('Forbidden', 'You don\'t have permissions to this resource', 403, null);

const getBaseRoute = (req) => {
  const path = req.path.split('/');
  return path.length > 1 ? path[1] : '/';
};

// авторизован ли пользователь
const isAuthorized = (req) => {
  const baseRoute = getBaseRoute(req);
  //исключения
  if (req.path === '/errors' || req.path === '/users' || req.path === '/token' || ((baseRoute === 'events' || baseRoute === 'books' || baseRoute === 'speakers' || baseRoute === 'reports') && req.method === 'GET')) {
    return 200;
  }

  // получаем токен
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // если не получили ошибка 401
  if (token == null) {
    return 401;
  }

  // проверка подлинности
  try {
    let user = jwt.verify(token, secretKey);
    req.app.set('sessionUser', user);
    return 200;
  }
  catch (e) {
    return 403;
  }
};

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use('/errors', function (req, res, next) {
  req.body.errorIp = req.ip;
  next();
})

// логинимся
server.post('/token', function (req, res) {
  const emailFromBody = req.body.email;
  const passwordFromBody = req.body.password;
  const hashedPassword = crypto.createHmac('sha256', hashingSecret).update(passwordFromBody).digest('hex');

  const db = router.db; //lowdb instance
  const user = db.get('users').find({ email: emailFromBody, password: hashedPassword }).value();

  if (user) {
    const token = generateAccessToken({ email: user.email, username: user.username });
    res.json({ token });
  }
  else {
    res.status(401).json(getError('Login', 'Error logging in user with that e-mail and password', 401, null));
  }
});

// проверка авторизации на каждом шаге и вывод ошибки в случае чего
server.use((req, res, next) => {
  const authorizeCode = isAuthorized(req);
  if (authorizeCode === 200) {
    next(); // continue to JSON Server router
  }
  else if (authorizeCode === 401) {
    res.status(401).json(getUnauthorizedError());
  }
  else if (authorizeCode === 403) {
    res.status(403).json(getForbiddenError());
  }
  else {
    res.status(403).json(getForbiddenError());
  }
});

// Получаем текущего пользователя
server.use((req, res, next) => {
  if (req.path === '/users/me' && req.method === 'GET') {
    let storedUser = req.app.get('sessionUser');
    if (!storedUser) {
      res.sendStatus(404);
    }
    else {
      const db = router.db; //lowdb instance
      const user = db.get('users').find({ username: storedUser.username }).value();
      const userCopy = Object.assign({}, user);

      delete userCopy.password;
      delete userCopy.passwordConfirmation;

      res.json(userCopy);
    }
  }
  else {
    next();
  }
});

// Disable get, modify or delete users
server.use((req, res, next) => {
  if (getBaseRoute(req) === 'users' && (req.method === 'PATCH' || req.method === 'DELETE')) {
    res.sendStatus(404);
  }
  else if (getBaseRoute(req) === 'users' && req.method === 'GET') {
    let urlSegms = req.url.split('/');
    let idStr = urlSegms[urlSegms.length - 1];
    let id = parseInt(idStr);
    id = isNaN(id) ? idStr : id;

    const db = router.db; //lowdb instance
    const user = db.get('users').find({ id: id }).value();
    const userCopy = Object.assign({}, user);

    delete userCopy.password;
    delete userCopy.passwordConfirmation;

    res.json(userCopy);
  }
  else {
    // Continue to JSON Server router
    next();
  }
});

// Добавление пользователя
server.use((req, res, next) => {
  const db = router.db;
  const userName = db.get('users').find({ username: req.body.username }).value();
  const userEmail = db.get('users').find({ email: req.body.email }).value();

  const validUserName = !req.body || req.body && !userName;
  const validEmail = !req.body || req.body && !userEmail;
  if (getBaseRoute(req) === 'users' && req.method === 'POST' && !validUserName) {
    res.status(422).json(getError('Username', 'username is already taken', 422, '/data/attributes/username'));
  }
  else if (getBaseRoute(req) === 'users' && req.method === 'POST' && !validEmail) {
    res.status(422).json(getError('Email', 'user with this email already exists', 422, '/data/attributes/email'));
  }
  else if (getBaseRoute(req) === 'users' && req.method === 'POST') {
    if (req.body.password === req.body.passwordConfirmation) {
      const hashedPassword = crypto.createHmac('sha256', hashingSecret).update(req.body.password).digest('hex');
      req.body.password = hashedPassword;
      delete req.body.passwordConfirmation;
      next();
    }
    else {
      res.status(422).json(getError('Password', 'password mismatch', 422, '/data/attributes/password'));
    }
  }
  else {
    // Continue to JSON Server router
    next();
  }
});

function responseInterceptor(req, res, next) {
  var originalSend = res.send;

  res.send = function () {
    let body = arguments[0];

    if (req.method === 'DELETE') {
      let urlSegms = req.url.split('/');
      let idStr = urlSegms[urlSegms.length - 1];
      let id = parseInt(idStr);
      id = isNaN(id) ? idStr : id;

      let newBody = Object.assign({}, JSON.parse(body));
      newBody.id = id;
      arguments[0] = JSON.stringify(newBody);
    }

    originalSend.apply(res, arguments);
  };

  next();
}

server.use(responseInterceptor);

// Use default router
server.use(router)

let port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running at port ${port}`);
})