import { useState } from 'react';
import { TableDefault } from '../../../../components/TableDefault';
import { ModalClientesID } from '../../Modals/ModalClientesID';

export function ContentBody({ content }) {
  const [open, setOpen] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  const handleNomeClick = (id) => {
    setSelectedID(id);
    setOpen(true);
  };

  return (
    <>
      <TableDefault
        columns={[
          { key: 'id', label: 'ID' },
          {
            key: 'nome',
            label: 'Nome',
            render: (row) => (
              <button
                onClick={() => handleNomeClick(row.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'blue',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                {row.nome}
              </button>
            ),
          },
          { key: 'email', label: 'Email' },
          { key: 'telefone', label: 'Telefone' },
          { key: 'cpf', label: 'CPF' },
        ]}
        rows={content}
      />
      <ModalClientesID open={open} onClose={() => setOpen(false)} ID={selectedID} />
    </>
  );
}
