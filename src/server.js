const express = require('express');
const axios = require('axios');

let app = express();
app.use(express.static(__dirname + '/frontend'))
app.set('views', __dirname + '/frontend');
app.set('view engine', 'ejs');

let IP = 'http://192.168.68.114'

app.get('/', async (req, res) => {
    let data;
    await axios.get(`${IP}/solar_api/v1/GetPowerFlowRealtimeData.fcgi`)
            .then(response => {
                data = {
                    production: response.data.Body.Data.Inverters['1'].P,
                    grid: Math.floor(response.data.Body.Data.Site.P_Grid)
                }
            })
            .catch(error => {
                console.log(error)
            })
    res.render('index', {
        titlu: 'Solar ☀️',
        production: data.production,
        consumption: data.production + data.grid,
        grid: data.grid
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});