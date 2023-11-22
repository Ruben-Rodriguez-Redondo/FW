import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {

    res.render('paginaprincipal', { 
        
    });
});

export default router;