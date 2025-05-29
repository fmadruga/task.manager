/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, TextField, Typography } from '@mui/material';
import { LoginBox } from './styles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { signIn } from '../../redux/slices/auth.slice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Obrigatório'),
  password: Yup.string().required('Obrigatório'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/tarefas');
  }, [token, navigate])
  
  return (
    <Container maxWidth='xs'>
      <LoginBox>
        <Typography variant="h5" align="center" mb={2}>Login</Typography>
        <Formik initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => { dispatch(signIn(values) as any) }}>
            {({ errors, touched }) => (
            <Form>
              <Field
                name="email"
                as={TextField}
                label="E-mail"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email && touched.email}
                helperText={touched.email && errors.email}
              />
              <Field
                name="password"
                as={TextField}
                type="password"
                label="Senha"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.password && touched.password}
                helperText={touched.password && errors.password}
              />

              {error && <Typography color="error">{error}</Typography>}

              <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} sx={{ mt: 2 }}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </Form>
          )}
        </Formik>
      </LoginBox>
    </Container>
  )
}

export default LoginPage;