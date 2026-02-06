import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { Actions } from '../../../../store/ducks/clientesDucks';
import { ModalDefault } from '../../../../components/ModalDefault';

interface ModalClientesIDProps {
  open: boolean;
  onClose: () => void;
  ID: string | number | null;
}

export function ModalClientesID({ open, onClose, ID }: ModalClientesIDProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (ID !== null) {
      dispatch(Actions.listClientesID({ id: ID }));
    }
  }, [ID, dispatch]);

  const {
    contentListClientesID,
    loadingListClientesID,
    successListClientesID,
    errorListClientesID,
  } = useAppSelector((state) => state.clientesReducer);

  const cliente = Array.isArray(contentListClientesID)
    ? contentListClientesID[0]
    : contentListClientesID;

  return (
    <ModalDefault open={open} onClose={onClose} title={`Cliente ID ${ID}`} maxWidth="lg">
      {loadingListClientesID ? (
        <img src="/assets/loading.gif" alt="Loading..." />
      ) : successListClientesID && cliente ? (
        <Box
          sx={{
            mt: 1,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
          }}
        >
          <TextField
            label="Nome"
            fullWidth
            value={cliente.nome ?? ''}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Email"
            fullWidth
            value={cliente.email ?? ''}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Telefone"
            fullWidth
            value={cliente.telefone ?? ''}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="CPF"
            fullWidth
            value={cliente.cpf ?? ''}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Data de nascimento"
            fullWidth
            value={cliente.dataNascimento ?? ''}
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Logradouro"
            fullWidth
            value={cliente.endereco?.logradouro ?? ''}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Bairro"
            fullWidth
            value={cliente.endereco?.bairro ?? ''}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="CEP"
            fullWidth
            value={cliente.endereco?.cep ?? ''}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Número"
            fullWidth
            value={cliente.endereco?.numero ?? ''}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Complemento"
            fullWidth
            value={cliente.endereco?.complemento ?? ''}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Cidade"
            fullWidth
            value={cliente.endereco?.cidade ?? ''}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="UF"
            fullWidth
            value={cliente.endereco?.uf ?? ''}
            InputProps={{ readOnly: true }}
          />
        </Box>
      ) : errorListClientesID ? (
        <p>{errorListClientesID}</p>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}
    </ModalDefault>
  );
}
