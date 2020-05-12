const  express = require('express');
const routes = require('./routes');
require('./database');
const app = express();
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus:200
}


app.use(express.json());
app.use(cors(corsOptions));
app.use(routes);

app.listen(3001);