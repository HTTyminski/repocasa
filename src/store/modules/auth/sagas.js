import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { login, password } = payload;

    const response = yield call(api.post, 'users/login', {
      login,
      password,
    });

    const token = response.headers.authorization;
    const user = response.data;

    // if (!user.provider) {
    //   toast.error('Usuário não é um prestador de serviço.');
    //   return;
    // }

    // api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/dashboard/consumo/leitura-consumo');
  } catch (error) {
    toast.error('Falha na autenticação. Usuário e senha não conferem.');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
