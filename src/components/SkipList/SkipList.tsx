import {
  Box,
  Typography,
  Button,
  Grid,
  Paper
} from '@mui/material';
import { SkipCard } from '../SkipCard/SkipCard';
import { type Skip } from '../../types/skip';

interface SkipListProps {
  skips: Skip[];
  area: string;
  selectedSkip: number | null;
  onSkipSelect: (skipId: number) => void;
  onLocationChange: () => void;
  onContinue: () => void;
}

export const SkipList = ({
  skips,
  area,
  selectedSkip,
  onSkipSelect,
  onLocationChange,
  onContinue
}: SkipListProps) => {
  const gridItemProps = {
    item: true as const,
    xs: 12 as const,
    sm: 6 as const,
    md: 4 as const,
    lg: 3 as const,
    sx: { 
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
      }
    }
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        flexWrap: 'wrap',
        gap: 2,
      }}>
        <Box>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            Available Skips in {area}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {skips.length} {skips.length === 1 ? 'skip' : 'skips'} available for hire
          </Typography>
        </Box>
        <Box>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={onLocationChange}
            sx={{ textTransform: 'none' }}
          >
            Change Location
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {skips.map((skip) => (
          <Grid key={skip.id} {...gridItemProps}>
            <SkipCard 
              skip={skip} 
              isSelected={selectedSkip === skip.id}
              onSelect={onSkipSelect}
            />
          </Grid>
        ))}
      </Grid>

      {selectedSkip && (
        <Box 
          sx={{
            position: 'sticky',
            bottom: 20,
            left: 0,
            right: 0,
            mt: 4,
            zIndex: 10,
            px: 2,
          }}
        >
          <Paper 
            elevation={3} 
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(to right, #1976d2, #2196f3)',
              color: 'white',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Ready to book your skip?
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  You've selected a {skips.find(s => s.id === selectedSkip)?.size} yard skip for {area}.
                  Click continue to select your delivery date and complete your booking.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={onContinue}
                  sx={{
                    width: { xs: '100%', md: 'auto' },
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.3)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Continue to Checkout
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </Box>
  );
};