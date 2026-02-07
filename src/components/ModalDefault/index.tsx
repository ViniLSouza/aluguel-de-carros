import { Dialog, DialogContent, DialogTitle, IconButton, Box } from '@mui/material';
import type { Breakpoint } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function ModalDefault({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = true,
}) {
  const allowedMaxWidths: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  const resolvedMaxWidth: Breakpoint =
    typeof maxWidth === 'string' && allowedMaxWidths.includes(maxWidth as Breakpoint)
      ? (maxWidth as Breakpoint)
      : 'sm';

  return (
    <Dialog open={open} onClose={onClose} maxWidth={resolvedMaxWidth} fullWidth={fullWidth}>
      {title && <DialogTitle sx={{ pr: 6 }}>{title}</DialogTitle>}

      <IconButton
        onClick={onClose}
        aria-label="fechar"
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <Box>{children}</Box>
      </DialogContent>
    </Dialog>
  );
}
