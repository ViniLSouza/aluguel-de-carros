import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalDefaultProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export function ModalDefault({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = true,
}: ModalDefaultProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      {title && (
        <DialogTitle sx={{ pr: 6 }}>
          {title}
        </DialogTitle>
      )}

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
