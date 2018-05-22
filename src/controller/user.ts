import { Router, Request, Response } from 'express';
import { mysqlDB } from '../shared/mysql-db';

const router = Router();

router.get('', (req: Request, res: Response) => {
    console.log("xxxxxx");
    mysqlDB.query('select * from sc_user', (err, result) => {
        console.log(err);
        res.json(result);
    });

});

export const UserController: Router = router;