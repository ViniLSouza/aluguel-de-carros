import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';

export type TableColumn<T> = {
  key: keyof T | string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: number | string;
  render?: (row: T) => React.ReactNode;
};

type TableDefaultProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  getRowId?: (row: T, index: number) => React.Key;
  loading?: boolean;
  emptyMessage?: string;
  dense?: boolean;
  onRowClick?: (row: T) => void;
};

export function TableDefault<T>({
  columns,
  rows,
  getRowId,
  loading = false,
  emptyMessage = 'Nenhum registro encontrado',
  dense = false,
  onRowClick,
}: TableDefaultProps<T>) {
  const hasRows = rows.length > 0;

  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
      <Table size={dense ? 'small' : 'medium'}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.key)}
                align={column.align ?? 'left'}
                sx={{ fontWeight: 600, width: column.width }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Box sx={{ py: 3 }}>
                  <CircularProgress size={24} />
                </Box>
              </TableCell>
            </TableRow>
          )}

          {!loading && !hasRows && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Box sx={{ py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            hasRows &&
            rows.map((row, index) => (
              <TableRow
                key={getRowId ? getRowId(row, index) : index}
                hover={Boolean(onRowClick)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {columns.map((column) => (
                  <TableCell key={String(column.key)} align={column.align ?? 'left'}>
                    {column.render ? column.render(row) : String(row[column.key as keyof T])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
