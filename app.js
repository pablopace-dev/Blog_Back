const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

port = process.env.PORT;

app.use(cors());                                    //Cors
app.use(express.static(__dirname + '/public'));     //Carpeta static

app.use(express.urlencoded({ extended: false }));   // Parse application/x-www-form-urlencoded
app.use(express.json());                             // Parse application/json


app.use('/api/users', require('./routers/routerUsers'));        //User routers
app.use('/api/entries', require('./routers/routerEntries'));    //Entries routers
app.use('/api/logs', require('./routers/routerLogs'));          //Logs routers


//Awake
app.use('/wakeup', (req, res) => {

    console.log(`I'm awake (Blog - Back)`);

    res.status(200).json({
        ok: true,
        msg: `I'm awake (Blog - Back)`
    });

});


//404
app.use((req, res, next) => { res.status(404).send({ msg: `Ruta no encontrada: ${req.url}` }); });


//Listener
app.listen(port, () => console.log(`Server listenning on port ${port}...`));