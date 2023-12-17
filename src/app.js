import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import { __dirname } from './dirname.js';
import anuncioRouter from './anuncioRouter.js';


const app = express();

app.set('views', __dirname + '/../Views');

app.set('view engine', 'html');
app.engine('html', mustacheExpress(), ".html");

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/../ImagenesPNG'));
app.use(express.static(__dirname + '/../CSSs'));
app.use(express.static(__dirname + '/../Public'));




app.use('/', anuncioRouter);


app.listen(3000, () => console.log('Listening on port 3000!'));