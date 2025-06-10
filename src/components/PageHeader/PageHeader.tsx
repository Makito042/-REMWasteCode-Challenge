import {
  Box,
  Typography
} from '@mui/material';

interface PageHeaderProps {
  activeStep: number;
}

export const PageHeader = ({ activeStep }: PageHeaderProps) => {
  return (
    <Box sx={{ mb: 6, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {activeStep === 2 ? 'Select Your Skip Size' : 'Find Your Perfect Skip'}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {activeStep === 2 
          ? 'Choose the right skip size for your project'
          : 'Enter your location to see available skips'}
      </Typography>
    </Box>
  );
};