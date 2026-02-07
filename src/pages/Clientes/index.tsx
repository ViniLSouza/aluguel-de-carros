import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Actions } from '../../store/ducks/clientesDucks.ts';
import { useEffect } from 'react';
import { ContentBody } from './Components/ContentBody';

export function Clientes() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(Actions.listClientes());
  }, [dispatch]);

  const { contentListClientes, loadingListClientes, successListClientes, errorListClientes } =
    useAppSelector(
      (state: {
        clientesReducer: {
          contentListClientes?: unknown[];
          loadingListClientes?: boolean;
          successListClientes?: boolean;
          errorListClientes?: unknown;
        };
      }) => state.clientesReducer,
    );

  return (
    <>
      {loadingListClientes ? (
        <img src="/assets/loading.gif" alt="Loading..." />
      ) : successListClientes ? (
        <ContentBody content={contentListClientes} />
      ) : errorListClientes ? (
        <p>{String(errorListClientes)}</p>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}
    </>
  );
}
