import { All, Controller, Inject, Logger, Req, Res } from '@nestjs/common';
import type { Auth } from 'better-auth';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { AUTH_INSTANCE_KEY } from '../../../commons/const/auth.const';

@Controller('api')
export class AuthController {
    constructor(@Inject(AUTH_INSTANCE_KEY) private readonly auth: Auth) { }

    @All('/auth/*')
    async handleAllRequests(
        @Req() request: FastifyRequest,
        @Res() response: FastifyReply,
    ): Promise<void> {
        try {
            const res = await this.auth.handler(request);
            response.status(res.status);
            response.send(res.body ? await res.text() : null);
        } catch (error) {
            if (process.env.NODE_ENV === 'development')
                Logger.error('Error in AuthController:', error);

            response.status(500).send({
                error: 'Internal authentication error',
                code: 'AUTH_FAILURE',
            });
        }
    }
}
