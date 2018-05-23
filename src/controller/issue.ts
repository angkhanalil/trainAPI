import { Router, Request, Response } from 'express';
// import { mysqlDB } from '../shared/mysql-db';
import * as excel from 'excel4node';
import { UserService } from '../shared/user';
import * as multer from 'multer';
import * as config from 'config';
import * as nodemailer from 'nodemailer';

const router = Router();

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.get("UPLOAD_PATH"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now + "-" + file.originalname)
    }
})

const upload = multer({ storage: diskStorage })

// const upload = multer({
//     dest: config.get("UPLOAD_PATH")
// });

router.get('/excel', (req: Request, res: Response) => {


    UserService.list((err, result) => {
        var wb = new excel.Workbook();
        var ws = wb.addWorksheet('All User');
        if (err) {
            res.json(err);
        } else {
            for (let i = 0; i < result.length; i++) {
                ws.cell(i + 1, 1).string(result[i].userCode);
                ws.cell(i + 1, 2).string(result[i].userTitle);
                ws.cell(i + 1, 3).string(result[i].userName);
                ws.cell(i + 1, 4).string(result[i].userLastName);
                ws.cell(i + 1, 5).string(result[i].userEmail);
                ws.cell(i + 1, 6).string(result[i].userTel);
            }

            wb.write("issue.xlsx", res);
        }

    })
    // .style({
    //     font: {
    //         bold: true
    //     }
    // });

});


router.post("/attach/:id", upload.single("attach"), (req: Request, res: Response) => {
    res.json({
        success: true
    });
});

router.post("/sendEmail/:id", (req: Request, res: Response) => {
    let email = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "training.pnpsolution@gmail.com",
            pass: "training1234.pnp"
        }
    });

    email.sendMail({
        subject: "Hello from node.js",
        to:"angkhana.lil94@gmail.com",
        html:"<b>Hello from node.js</b>",
        attachments:[{
            path:"uploads/issue.xlsx"
        }]
    }, (err, result) => {
        res.json({
            success: true
        })
    })

});

export const IssueController: Router = router;