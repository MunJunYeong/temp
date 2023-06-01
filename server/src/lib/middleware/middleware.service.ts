import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../jwt/jwt.service';
import { UserRepository } from 'src/user/user.repo';

@Injectable()
export class CustomMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // 미들웨어 로직
    console.log('Custom middleware is running...');

    const accessToken: string = req.headers.authorization;

    try {
      // 1. toekn decoded
      const decoded = this.jwtService.verifyToken(accessToken);
      // 2. find user by id in token data
      const user = await this.userRepo.findOneByID(decoded['id']);
      // 3. set request in user
      req['user'] = user;

    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to authentication user',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    next();
  }
}
