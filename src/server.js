const express = require('express');

let app = express();
app.use(express.static(__dirname + '/frontend'))
app.set('views', __dirname + '/frontend');
app.set('view engine', 'ejs');

let IP = 'http://192.168.68.110'
const PORT = 3000;

app.get('/', async (req, res) => {
    let data;
    
    await fetch(`${IP}/solar_api/v1/GetPowerFlowRealtimeData.fcgi`)
        .then(response => response.json())
        .then(response => {
            data = {
                production: response.Body.Data.Inverters['1'].P,
                grid: Math.floor(response.Body.Data.Site.P_Grid)
            }
        })
        .catch(error => {
            console.log(error)
        })
    
    res.render('index', {
        titlu: 'Solar ☀️',
        production: data.production,
        consumption: (data.production + data.grid),
        grid: data.grid
    });
});

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});