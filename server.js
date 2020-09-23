require("dotenv").config()
const { response } = require('express');
const express = require('express');
const userRouter = require('./api/users/user.router');
const app = express();
const port = process.env.PORT || 3000;
const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
//Extended
// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//             title: 'User APIs',
//             description: 'First hand experience for Express js, Node.js, swagger and postman with mysql',
//             version:'0.0.1',
//             contact: {
//                 name: 'dhaivat',

//             },
//             servers: ["http://localhost:3000"]
//         }
//     },
//     apis: ["server.js","./api/users/user.router.js"]
// };
const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/test', (req, res) => {
    res.json({
        sucess: "1",
        message: "received"
    })
})
 

app.use(express.json());
app.use('/users', userRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Port activated " + port);
})