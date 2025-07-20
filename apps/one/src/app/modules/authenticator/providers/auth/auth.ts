import { Provider } from '@nestjs/common';
import { auth } from '../../../../../utils/auth';
import { AUTH_INSTANCE_KEY } from '../../../../commons/const/auth.const';

export const AuthProvider: Provider = {
    provide: AUTH_INSTANCE_KEY,
    useFactory: () => auth,
};
