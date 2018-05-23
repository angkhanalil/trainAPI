import { Router, Request, Response } from 'express';
// import { mysqlDB } from '../shared/mysql-db';
import {jwt} from '../shared/auth';
import {UserService} from '../shared/user';
import { mysqlDB } from '../shared/mysql-db';

const router = Router();

router.get('',jwt.authenticate(), (req: Request, res: Response) => {
    UserService.list((err,result)=>{
        res.json(result);
    })
    // mysqlDB.query('select * from sc_user', (err, result) => {
        
    //     console.log(err);
    //     res.json(result);
    // });

});

router.post('', function (req, res) {
    let obj = req.body;
    let sql = `
insert into sc_user(
        user_code,
        user_title,
        user_first_name,
        user_last_name,
        user_mobile,
        user_tel,
        user_email,
        user_pwd,
        user_active
    )values ( 
    '${obj.userCode}',
    '${obj.userTitle}',
    '${obj.userFirstName}',
    '${obj.userLastName}',
    '${obj.userMobile}',
    '${obj.userTel}',
    '${obj.userEmail}',
    '${obj.userPwd}',
    '${obj.userActive}'
)`;
    mysqlDB.query(sql, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                success: true
            })
        }
    });
});

export const UserController: Router = router;