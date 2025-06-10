import {
  Alert,
  AlertTitle,
  Box,
  Button
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <Alert 
      severity="error" 
      sx={{ 
        mb: 6, 
        maxWidth: 800, 
        mx: 'auto',
        '& .MuiAlert-message': {
          width: '100%',
        },
      }}
    >
      <AlertTitle sx={{ fontWeight: 600 }}>Oops! Something went wrong</AlertTitle>
      {error} Please try again or contact support if the problem persists.
      <Box mt={2}>
        <Button 
          variant="outlined" 
          color="inherit" 
          onClick={onRetry}
          startIcon={<ReplayIcon />}
          sx={{ mt: 1 }}
        >
          Retry Search
        </Button>
      </Box>
    </Alert>
  );
};