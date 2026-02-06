import { TableDefault } from '../../../../components/TableDefault';
import type { Cliente } from '../../../../types/cliente';

interface ContentBodyProps {
  content: Cliente[];
}

export function ContentBody({ content }: ContentBodyProps) {
  return (
    <TableDefault
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'nome', label: 'Nome' },
        { key: 'email', label: 'Email' },
        { key: 'telefone', label: 'Telefone' },
        { key: 'cpf', label: 'CPF' },
      ]}
      rows={content}
    />
  );
}
