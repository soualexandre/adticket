import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY, jwtConstants } from 'src/common/constants/constants';
import { CacheService } from 'src/modules/cache/cache.service';
import { JwtPayload } from 'jsonwebtoken';
type TokenData = {
    user: any,
    accessToken: string;
};

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private redisCache: CacheService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            console.log('Rota pública, acesso permitido.');
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            console.log('Token não encontrado no cabeçalho.');
            throw new UnauthorizedException();
        }

        try {
            const decodedToken = this.jwtService.decode(token) as JwtPayload & { id: string };
            if (!decodedToken || !decodedToken.id) {
                throw new UnauthorizedException('Token inválido');
            }


            const redisToken = await this.redisCache.get<TokenData>(decodedToken.id);

            if (!redisToken) {
                console.log('Token não encontrado no Redis.');
                throw new UnauthorizedException();
            }

            const verifiedPayload = await this.jwtService.verifyAsync(redisToken.accessToken, {
                secret: jwtConstants.secret,
            });

            request['user'] = verifiedPayload;
            console.log('Token válido, acesso permitido.');
            return true;
        } catch (error) {
            console.log('Erro ao validar o token:', error.message);
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}