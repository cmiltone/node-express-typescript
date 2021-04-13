import { controller, BaseHttpController, httpPost, httpPut } from 'inversify-express-utils';
import { inject } from 'inversify';
import { celebrate, Joi } from 'celebrate';
import { Auth2Middleware } from '../middlewares/auth';
import { AuthService } from '../../services/auth';

@controller('/v1/auth')
export class AuthController extends BaseHttpController {
  @inject(AuthService)
  private authService: AuthService;

  @httpPost(
    '/login',
    celebrate({
      body: Joi.object({
        identifier: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
  )
  async login(): Promise<void> {
    const { identifier, password } = this.httpContext.request.body;

    const result = await this.authService.login({ identifier }, { password, verify: true });

    this.httpContext.response.json({ ...result });
  }

  @httpPost(
    '/login/verify',
    celebrate({
      body: Joi.object({
        verificationCode: Joi.string().required(),
        token: Joi.string().required(),
      }),
    }),
  )
  async verifyLogin(): Promise<void> {
    const { verificationCode, token } = this.httpContext.request.body;

    const result = await this.authService.verifyLogin({ token, verificationCode });

    this.httpContext.response.set('Authorization', `Bearer ${result.token}`);

    this.httpContext.response.json({ ...result });
  }

  @httpPost(
    '/register',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
  )
  async register(): Promise<void> {
    const { firstName, lastName, phoneNumber, email, password } = this.httpContext.request.body;

    const result = await this.authService.register(
      { firstName, lastName, phoneNumber, email },
      { password, verify: true },
    );

    this.httpContext.response.json({ ...result });
  }

  @httpPost(
    '/register/verify',
    celebrate({
      body: Joi.object({
        verificationCode: Joi.string().required(),
        token: Joi.string().required(),
      }),
    }),
  )
  async verifyRegister(): Promise<void> {
    const { verificationCode, token } = this.httpContext.request.body;

    const result = await this.authService.verifyRegister({ token, verificationCode });

    this.httpContext.response.set('Authorization', `Bearer ${result.token}`);

    this.httpContext.response.json({ ...result });
  }

  @httpPost(
    '/password',
    celebrate({
      body: Joi.object({
        identifier: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
  )
  async setPassword(): Promise<void> {
    const { identifier, password } = this.httpContext.request.body;

    const result = await this.authService.setPassword({ identifier }, { password, verify: true });

    this.httpContext.response.json({ ...result });
  }

  @httpPost(
    '/password/verify',
    celebrate({
      body: Joi.object({
        verificationCode: Joi.string().required(),
        token: Joi.string().required(),
      }),
    }),
  )
  async verifySetPassword(): Promise<void> {
    const { verificationCode, token } = this.httpContext.request.body;

    const result = await this.authService.verifySetPassword({ token, verificationCode });

    this.httpContext.response.set('Authorization', `Bearer ${result.token}`);

    this.httpContext.response.json({ ...result });
  }

  @httpPut(
    '/password',
    Auth2Middleware,
    celebrate({
      body: Joi.object({
        identifier: Joi.string().required(),
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().required(),
      }),
    }),
  )
  async changePassword(): Promise<void> {
    const { identifier, currentPassword, newPassword } = this.httpContext.request.body;

    const result = await this.authService.changePassword({ identifier }, { currentPassword, newPassword });

    this.httpContext.response.set('Authorization', `Bearer ${result.token}`);

    this.httpContext.response.json({ ...result });
  }
}
