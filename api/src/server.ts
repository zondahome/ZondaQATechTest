import http from 'http';
import express, { Express } from 'express';
import subdivisionRouter from './routes/subdivisionRoutes'

const router: Express = express();

router.use(express.urlencoded({ extended: false}));
router.use(express.json());

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
})

router.use("/api/subdivisions", subdivisionRouter);

router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    })
});

const httpsServer = http.createServer(router);
const PORT = 3001;
httpsServer.listen(PORT, () => {console.log(`API IS LISTENING ON PORT ${PORT}`);})