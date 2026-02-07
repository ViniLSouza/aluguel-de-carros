import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Actions } from '../../../../store/ducks/clientesDucks.ts';
import { ModalDefault } from '../../../../components/ModalDefault';
import { Controller, useForm } from 'react-hook-form';
import { DialogAction } from '../../../../components/DialogAction/index.tsx';

const defaultValues = {
  nome: '',
  email: '',
  telefone: '',
  endereco: {
    logradouro: '',
    numero: '',
    bairro: '',
    complemento: '',
    cep: '',
    cidade: '',
    uf: '',
  },
};

export function ModalClientesID({ open, onClose, ID }) {
  const [dialogDismissed, setDialogDismissed] = useState(false);

  const {
    contentlistClienteID,
    loadinglistClienteID,
    successlistClienteID,
    errorlistClienteID,
    successDesativarCliente,
    errorDesativarCliente,
    successEditarCliente,
    errorEditarCliente,
  } = useAppSelector(
    (state: {
      clientesReducer: {
        contentlistClienteID?: unknown;
        loadinglistClienteID?: boolean;
        successlistClienteID?: boolean;
        errorlistClienteID?: unknown;
        successDesativarCliente?: boolean;
        errorDesativarCliente?: unknown;
        successEditarCliente?: boolean;
        errorEditarCliente?: unknown;
      };
    }) => state.clientesReducer,
  );

  const cliente = Array.isArray(contentlistClienteID)
    ? contentlistClienteID[0]
    : contentlistClienteID;

  const { control, handleSubmit, reset } = useForm({ defaultValues });

  useEffect(() => {
    if (!cliente) {
      reset(defaultValues);
      return;
    }

    reset({
      nome: cliente?.nome ?? '',
      email: cliente?.email ?? '',
      telefone: cliente?.telefone ?? '',
      endereco: {
        logradouro: cliente?.endereco?.logradouro ?? '',
        numero: cliente?.endereco?.numero ?? '',
        bairro: cliente?.endereco?.bairro ?? '',
        complemento: cliente?.endereco?.complemento ?? '',
        cep: cliente?.endereco?.cep ?? '',
        cidade: cliente?.endereco?.cidade ?? '',
        uf: cliente?.endereco?.uf ?? '',
      },
    });
  }, [cliente, reset]);

  const handleEditarCliente = (data) => {
    if (ID !== null) {
      setDialogDismissed(false);
      dispatch(Actions.editarCliente({ id: ID, payload: data }));
    }
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (ID !== null) {
      dispatch(Actions.listClienteID({ id: ID }));
    }
  }, [ID, dispatch]);

  const handlesDesativarCliente = () => {
    if (ID !== null) {
      setDialogDismissed(false);
      dispatch(Actions.desativarCliente({ id: ID }));
    }
  };

  const dialogType =
    successDesativarCliente || successEditarCliente
      ? 'success'
      : errorDesativarCliente || errorEditarCliente
        ? 'error'
        : null;
  const dialogMessage =
    dialogType === 'success'
      ? 'Ação realizada com sucesso.'
      : errorDesativarCliente || errorEditarCliente
        ? String(errorDesativarCliente || errorEditarCliente)
        : undefined;
  const openDialog = Boolean(dialogType) && !dialogDismissed;

  return (
    <ModalDefault open={open} onClose={onClose} title={`Cliente ID ${ID}`} maxWidth="lg">
      {loadinglistClienteID ? (
        <img src="/assets/loading.gif" alt="Loading..." />
      ) : successlistClienteID && cliente ? (
        <Box
          component="form"
          onSubmit={handleSubmit(handleEditarCliente)}
          sx={{
            mt: 1,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
          }}
        >
          <Controller
            name="nome"
            control={control}
            render={({ field }) => (
              <TextField label="Nome" fullWidth {...field} value={field.value ?? ''} />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField label="Email" fullWidth {...field} value={field.value ?? ''} />
            )}
          />
          <Controller
            name="telefone"
            control={control}
            render={({ field }) => (
              <TextField label="Telefone" fullWidth {...field} value={field.value ?? ''} />
            )}
          />
          <Controller
            name="endereco.logradouro"
            control={control}
            render={({ field }) => (
              <TextField label="Logradouro" fullWidth {...field} value={field.value ?? ''} />
            )}
          />
          <Controller
            name="endereco.numero"
            control={control}
            render={({ field }) => (
              <TextField label="Número" fullWidth {...field} value={field.value ?? ''} />
            )}
          />
          <Controller
            name="endereco.bairro"
            control={control}
            render={({ field }) => (
              <TextField label="Bairro" fullWidth {...field} value={field.value ?? ''} />
            )}
          />
          <Controller
            name="endereco.complemento"
            control={control}
            render={({ field }) => (
              <TextField label="Complemento" fullWidth {...field} value={field.value ?? ''} />
            )}
          />
          <Controller
            name="endereco.cep"
            control={control}
            render={({ field }) => (
              <TextField label="CEP" fullWidth {...field} value={field.value ?? ''} />
            )}
          />
          <Controller
            name="endereco.cidade"
            control={control}
            render={({ field }) => (
              <TextField label="Cidade" fullWidth {...field} value={field.value ?? ''} />
            )}
          />
          <Controller
            name="endereco.uf"
            control={control}
            render={({ field }) => (
              <TextField label="UF" fullWidth {...field} value={field.value ?? ''} />
            )}
          />
          {cliente?.ativo ? (
            <Button type="button" onClick={handlesDesativarCliente}>
              Desativar Cliente
            </Button>
          ) : (
            <Button>Ativar Cliente</Button>
          )}
          <Button type="submit">Editar Cliente</Button>
        </Box>
      ) : errorlistClienteID ? (
        <p>{String(errorlistClienteID)}</p>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}
      <DialogAction
        open={openDialog}
        onClose={() => {
          setDialogDismissed(true);
          dispatch(Actions.listClienteID({ id: ID }));
        }}
        type={dialogType ?? 'success'}
        message={dialogMessage}
      />
    </ModalDefault>
  );
}
