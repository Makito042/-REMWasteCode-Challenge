import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  selectedSkipId: number | null;
  onBack: () => void;
  onConfirm: () => void;
}

export const ConfirmationDialog = ({
  open,
  selectedSkipId,
  onBack,
  onConfirm
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onBack}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      maxWidth="sm"
      fullWidth
      disableEnforceFocus
      disableAutoFocus
      disableScrollLock
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'flex-start',
          mt: 10
        },
        '& .MuiDialog-paper': {
          m: 0,
          position: 'relative',
          borderRadius: 2,
          overflow: 'visible'
        }
      }}
    >
      <DialogTitle id="confirm-dialog-title" sx={{ bgcolor: 'primary.main', color: 'white' }}>
        Confirm Your Selection
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <DialogContentText id="confirm-dialog-description" sx={{ mb: 2, color: 'text.primary' }}>
          Please confirm that you want to proceed with the selected skip size.
        </DialogContentText>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2, p: 2, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 1 }}>
          Note: Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
        </Typography>
        <Box sx={{ mt: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>Selected Skip:</Typography>
          <Typography variant="body2">
            {selectedSkipId ? `ID: ${selectedSkipId}` : 'No skip selected'}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: 'space-between', borderTop: '1px solid', borderColor: 'divider' }}>
        <Button 
          onClick={onBack} 
          variant="outlined"
          sx={{ minWidth: '120px' }}
        >
          Back
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="primary" 
          sx={{ minWidth: '160px' }}
        >
          Confirm Selection
        </Button>
      </DialogActions>
    </Dialog>
  );
};