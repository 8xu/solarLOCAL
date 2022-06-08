const express = require('express');
const axios = require('axios');

let app = express();
app.use(express.static(__dirname + '/frontend'))
app.set('views', __dirname + '/frontend');
app.set('view engine', 'ejs');

let IP = 'http://192.168.68.114'

app.get('/', async (req, res) => {
    res.render('index', {
        titlu: 'Panouri Solare',
        productie: await axios.get(`${IP}/solar_api/v1/GetPowerFlowRealtimeData.fcgi`)
            .then(response => {
                const productie = response.data.Body.Data.Inverters['1'].P
                return productie
            })
            .catch(error => {
                console.log(error)
            }),
        consum: await axios.get(`${IP}/solar_api/v1/GetPowerFlowRealtimeData.fcgi`)
            .then(response => {
                const consum = response.data.Body.Data.Site.P_PV;
                return consum
            })
            .catch(error => {
                console.log(error)
            }),
        grid: await axios.get(`${IP}/solar_api/v1/GetPowerFlowRealtimeData.fcgi`)
            .then(response => {
                const grid = response.data.Body.Data.Site.P_Grid;
                return grid
            })
            .catch(error => {
                console.log(error)
            })
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});