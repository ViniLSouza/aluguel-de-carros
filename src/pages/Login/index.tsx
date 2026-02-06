import { useState } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Actions } from '../../store/ducks/authDuck';

export function Login() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, status, error } = useAppSelector((state) => state.authReducer);
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const isLoading = status === 'loading';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!login || !senha || isLoading) {
      return;
    }
    dispatch(Actions.login({ login, senha }));
  };

  return (
    <Dialog open={!isAuthenticated} maxWidth="xs" fullWidth>
      <DialogTitle>Entrar</DialogTitle>
      <form onSubmit={handleSubmit} noValidate>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Login"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            autoComplete="username"
            required
            fullWidth
          />
          <TextField
            label="Senha"
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            autoComplete="current-password"
            required
            fullWidth
          />
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={18} /> : undefined}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
