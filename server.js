const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const fs = require('fs');

fs.readFile('dias-uteis.json', (err, data) => {
    if (err) throw err;
    const resposta = JSON.parse(data);
    console.log(resposta);
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.post('/token', (req, res) => {
    console.log('obtendo token');
    res.jsonp({
        "access_token": "21e4a989-c08b-3d9e-b62f-17ee4fd5dc42",
        "scope": "am_application_scope default",
        "token_type": "Bearer",
        "expires_in": 1619
    });
})

server.post('/CadastroService/', (req, res) => {
    console.log('obtendo dias úteis');
    res.jsonp(resposta);

    /*
    res.jsonp({
        "Envelope": {
            "Body": {
                "buscarFeriadoResponse": {
                    "outBuscarFeriado": {
                        "dias": {
                            "dia": "2019-03-27T00:00:00-02:00",
                            "flagDiaUtil": "S"
                        }
                    }
                }
            }
        }
    });
    */
})



// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

// Use default router
server.use(router)
server.listen(4000, () => {
    console.log('JSON Server is running')
})