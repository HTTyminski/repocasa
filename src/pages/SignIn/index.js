import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import { ReactComponent as LogoSIM } from '../../assets/svg/logo-sim.svg';
import { ReactComponent as LogoVega } from '../../assets/svg/logo-vega.svg';

const schema = Yup.object().shape({
  login: Yup.string().required('O login é obrigatório.'),
  password: Yup.string()
    .min(6, 'A senha deve conter no mínimo 6 caracteres.')
    .required('A senha é obrigatória.'),
});

export default function SignIn({ withQueryString }) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ login, password }) {
    dispatch(signInRequest(login, password));
  }

  return (
    <>
      {!withQueryString || !loading ? (
        <>
          <LogoSIM className="logo-sim" />
          <Form schema={schema} onSubmit={handleSubmit}>
            <p>
              Bem-vindo ao <strong>SIM Sistema Integrado de Manutenção</strong>
            </p>
            <Input name="login" type="text" placeholder="Insira seu login" />
            <Input
              name="password"
              type="password"
              placeholder="Insira sua senha"
            />
            <button type="submit">
              {loading ? 'Carregando...' : 'Entrar'}
            </button>
          </Form>
          <a
            href="http://vegait.com.br/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Desenvolvido por <LogoVega />
          </a>
        </>
      ) : null}
    </>
  );
}
