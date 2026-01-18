import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import * as path from 'node:path';
import * as fs from 'node:fs';

@Controller()
export class StaticController {
    @Get('content/afisha')
    getAfishaRoot(@Res() res: Response) {
        const dir = path.resolve(
            __dirname,
            '..',
            'public',
            'content',
            'afisha',
        );

        const files = fs.readdirSync(dir)

        return res.redirect(`/content/afisha/${files[0]}`);
    }
}