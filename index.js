const express = require('express');
const peer = require('peer');
const dotenv = require('dotenv');
const logger = require('morgan');

/**
 * Load environment variables from .env files ( API keys and passwords)
 */
dotenv.load({ path: '.env' });

const app = express();

app.use(express.static('./public'));
app.use(logger('dev'));

app.set('view engine', 'jade');
app.set('views', './views');

app.route('/').get(function(req, res) {
    res.render('layout');
})

const server = app.listen(process.env.PORT, () => {
    console.log('Server started at : http://localhost:' + process.env.PORT);
});

app.use('/peerjs', peer.ExpressPeerServer(server, {
    debug: true
}));
