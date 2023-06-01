import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class CustomMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // 미들웨어 로직
    console.log('Custom middleware is running...');

    const accessToken: string = req.headers['access_token'] as string;
    try {
      const decoded = this.jwtService.verifyToken(accessToken);
      // 검증 성공 시에 처리할 로직
      console.log('Decoded Token:', decoded);
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to authentication user',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    next(); // 다음 미들웨어나 요청 핸들러로 제어를 전달
  }
}
