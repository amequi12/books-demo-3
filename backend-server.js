// eslint-disable-next-line no-undef
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults();

server.use(middlewares)

server.use(jsonServer.bodyParser);

function responseInterceptor(req, res, next) {
  var originalSend = res.send;

  res.send = function() {
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

server.use(router)

let port = 3000;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`JSON Server is running at port ${port}`);
})
