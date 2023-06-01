import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  // JWT 시크릿 키
  private readonly secretKey: string = 'test';

  generateAccessToken(payload: any): string {
    return jwt.sign(payload, this.secretKey, {expiresIn : "6h"});
  }
  generateRefreshToken(payload: any): string {
    return jwt.sign(payload, this.secretKey, {expiresIn : "15d"});
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
