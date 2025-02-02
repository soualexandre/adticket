import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserPrismaGateway } from '../user/gateway/user.prisma.gateway';
import { CreateAuthDto } from "./dto/create-auth.dto";
import { CacheService } from "../cache/cache.service";
import { SetOptions } from "redis";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userGateway: UserPrismaGateway,
    private readonly cacheService: CacheService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userGateway.findOneByEmail(email);

    if (!user || !user.password) {
      this.logger.warn(`User not found or missing password: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      this.logger.warn(`Invalid password attempt for user: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async sinIn(createAuthDto: CreateAuthDto): Promise<any> {
    const expire = false;
    const user = await this.validateUser(createAuthDto.email, createAuthDto.password);
    if (!user) {
      this.logger.warn(`User not found with ID: ${user}`);
      throw new UnauthorizedException('User not found');
    }
    const accessToken = this.jwtService.sign(user);

    const dataUser = {
      user,
      accessToken
    }

    const redisData = await this.cacheService.storeData(user.id, dataUser, '24h');
    return {
      ...user,
      accessToken
    };
  }

}