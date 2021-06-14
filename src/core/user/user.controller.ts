import { Body, Controller, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';
import { Response } from 'express';
import { User } from './user.entity';

import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService, private jwt: JwtService) {}
  @Post('/login')
  /**
   * login
   */
  public async login(@Body() loginParams: any, @Res() res: Response) {
    const user = await this.userService.findOne({
      where: { username: loginParams.username },
    });
    if (user) {
      const matchPassword = User.comparePassword(user, loginParams.password);
      if (matchPassword) {
        const token = this.jwt.sign({ id: user.userId });
        const successResponse = {
          message: 'Login successful',
          data: {
            token,
            user: classToPlain(user),
          },
        };
        return res.status(200).send(successResponse);
      } else {
        const errorResponse: any = {
          status: 0,
          message: 'Invalid password',
        };
        return res.status(400).send(errorResponse);
      }
    } else {
      const errorResponse: any = {
        status: 0,
        message: 'Username invalid',
      };
      return res.status(400).send(errorResponse);
    }
  }
}
