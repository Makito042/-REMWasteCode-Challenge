import {
  Box,
  CircularProgress,
  Typography
} from '@mui/material';

interface LoadingStateProps {
  area: string;
}

export const LoadingState = ({ area }: LoadingStateProps) => {
  return (
    <Box display="flex" justifyContent="center" my={12}>
      <Box textAlign="center">
        <CircularProgress size={60} thickness={4} sx={{ mb: 2, color: 'primary.main' }} />
        <Typography variant="h6" color="text.secondary">
          Finding available skips in {area}...
        </Typography>
      </Box>
    </Box>
  );
};