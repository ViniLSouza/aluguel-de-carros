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

export function TableDefault({
  columns,
  rows,
  getRowId = undefined,
  loading = false,
  emptyMessage = 'Nenhum registro encontrado',
  dense = false,
  onRowClick = undefined,
}) {
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
                    {column.render ? column.render(row) : String(row?.[column.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
