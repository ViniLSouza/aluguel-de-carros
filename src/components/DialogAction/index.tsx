import type { ReactNode } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

type DialogActionType = 'success' | 'error' | 'question';

type DialogActionProps = {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  type?: DialogActionType;
  title?: string;
  message?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
};

const dialogTypeConfig = {
  success: {
    title: 'Sucesso',
    message: 'Ação concluída com sucesso.',
    color: 'success.main',
    icon: CheckCircleOutlineIcon,
  },
  error: {
    title: 'Erro',
    message: 'Não foi possível concluir a ação.',
    color: 'error.main',
    icon: ErrorOutlineIcon,
  },
  question: {
    title: 'Confirmar ação',
    message: 'Tem certeza de que deseja continuar?',
    color: 'warning.main',
    icon: HelpOutlineIcon,
  },
} as const;

export function DialogAction({
  open,
  onClose,
  onConfirm,
  onCancel,
  type = 'success',
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancelar',
  showCancel,
}: DialogActionProps) {
  const config = dialogTypeConfig[type];
  const Icon = config.icon;
  const resolvedTitle = title ?? config.title;
  const resolvedMessage = message ?? config.message;
  const resolvedShowCancel = showCancel ?? type === 'question';
  const resolvedConfirmLabel = confirmLabel ?? (type === 'question' ? 'Confirmar' : 'OK');

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
      return;
    }
    if (onClose) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{resolvedTitle}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', pt: 1 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: config.color,
              flexShrink: 0,
            }}
          >
            <Icon fontSize="large" />
          </Box>
          <Box sx={{ flex: 1 }}>
            {typeof resolvedMessage === 'string' ? (
              <Typography variant="body1" color="text.secondary">
                {resolvedMessage}
              </Typography>
            ) : (
              resolvedMessage
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        {resolvedShowCancel && (
          <Button variant="text" onClick={handleCancel}>
            {cancelLabel}
          </Button>
        )}
        <Button variant="contained" onClick={handleConfirm}>
          {resolvedConfirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
