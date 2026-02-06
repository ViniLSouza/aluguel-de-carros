import { useState } from 'react';
import { TableDefault } from '../../../../components/TableDefault';
import type { Cliente } from '../../../../types/cliente';
import { ModalClientesID } from '../../Modals/ModalClientesID';

interface ContentBodyProps {
  content: Cliente[];
}

export function ContentBody({ content }: ContentBodyProps) {
  const [open, setOpen] = useState(false);
  const [selectedID, setSelectedID] = useState<string | number | null>(null);

  const handleNomeClick = (id: string | number) => {
    setSelectedID(id);
    setOpen(true);
  };

  return (
    <>
      <TableDefault<Cliente>
        columns={[
          { key: 'id', label: 'ID' },
          {
            key: 'nome',
            label: 'Nome',
            render: (row: Cliente) => (
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
