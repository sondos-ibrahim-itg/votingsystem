const express = require('express');
const cors = require('cors');
const path = require( "path" );
const engine = require('consolidate');
const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.engine('html', engine.mustache);
app.set('view engine', 'html');
app.engine('js', engine.mustache);
app.engine('css', engine.mustache);

app.set('views', path.resolve('../') + '\\client\\');

require('./routes/pollrouts.js')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
});

