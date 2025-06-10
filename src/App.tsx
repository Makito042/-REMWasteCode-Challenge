import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  Alert, 
  AlertTitle, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  styled, 
  useTheme, 
  useMediaQuery, 
  ThemeProvider, 
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  type StepIconProps
} from '@mui/material';
import { Search as SearchIcon, Check as CheckIcon } from '@mui/icons-material';
import ReplayIcon from '@mui/icons-material/Replay';
import { SkipCard } from './components/SkipCard/SkipCard';
import { type Skip } from './types/skip';
import { fetchSkips, getMockedSkips } from './api/skipService';

const steps = [
  'Postcode',
  'Waste Type',
  'Skip Selection',
  'Permit Check',
  'Date',
  'Payment'
];

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[300],
  zIndex: 1,
  color: theme.palette.common.white,
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient(180deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;
  const icons: { [index: string]: React.ReactElement } = {
    1: <SearchIcon />,
    2: <CheckIcon />,
    3: <CheckIcon />,
    4: <CheckIcon />,
    5: <CheckIcon />,
    6: <CheckIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <CheckIcon /> : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(2); // Skip Selection is step 3 (0-indexed)
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [postcode, setPostcode] = useState<string>('NR32');
  const [area, setArea] = useState<string>('Lowestoft');
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  
  // Load skips when component mounts or postcode/area changes
  const loadSkips = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let data: Skip[] = [];
      try {
        // Try to fetch from API first
        data = await fetchSkips(postcode, area);
        // If no data from API, use mock data
        if (!data || data.length === 0) {
          console.warn('No data from API, using mock data');
          data = getMockedSkips();
        }
      } catch (err) {
        console.error('Error fetching skips, using mock data', err);
        data = getMockedSkips();
      }
      setSkips(data);
    } catch (err) {
      console.error('Error loading skips:', err);
      setError('Failed to load skip data. Using sample data instead.');
      // Fallback to mocked data in case of error
      setSkips(getMockedSkips());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkips();
  }, [postcode, area]);

  const handleSkipSelect = (skipId: number) => {
    setSelectedSkip(selectedSkip === skipId ? null : skipId);
  };

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleContinue = () => {
    if (selectedSkip) {
      setOpenConfirmDialog(true);
    }
  };

  const handleConfirm = () => {
    setOpenConfirmDialog(false);
    // Navigate to next step (permit check)
    setActiveStep(3);
  };

  const handleBack = () => {
    setOpenConfirmDialog(false);
  };

  // Grid item props type
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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadSkips();
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostcode(e.target.value);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArea(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 6 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Progress Stepper */}
          <Box sx={{ width: '100%', mb: 6 }}>
            <Stepper 
              activeStep={activeStep} 
              alternativeLabel
              sx={{ 
                '& .MuiStepLabel-label': {
                  fontSize: isMobile ? '0.7rem' : '0.875rem',
                },
                '& .MuiStepLabel-label.Mui-active': {
                  fontWeight: 600,
                },
              }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {isMobile ? (index === activeStep ? label : '') : label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

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

          {activeStep <= 1 && (
            <Paper 
              component="form" 
              onSubmit={handleSearch}
              sx={{ 
                p: 3, 
                mb: 6,
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: 800,
                mx: 'auto',
                background: 'linear-gradient(145deg, #f5f7fa 0%, #eef2f5 100%)',
              }}
            >
              <Grid container spacing={2} alignItems="center" component="form" onSubmit={handleSearch}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="Postcode"
                    value={postcode}
                    onChange={handlePostcodeChange}
                    required
                    variant="outlined"
                    InputProps={{
                      sx: { 
                        backgroundColor: 'white',
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'white',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="Area"
                    value={area}
                    onChange={handleAreaChange}
                    required
                    variant="outlined"
                    InputProps={{
                      sx: { 
                        backgroundColor: 'white',
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'white',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<SearchIcon />}
                    sx={{ 
                      height: '56px',
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
                      '&:hover': {
                        boxShadow: '0 6px 20px 0 rgba(0, 118, 255, 0.5)',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isMobile ? 'Search' : 'Find Skips'}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          )}

          {loading ? (
            <Box display="flex" justifyContent="center" my={12}>
              <Box textAlign="center">
                <CircularProgress size={60} thickness={4} sx={{ mb: 2, color: 'primary.main' }} />
                <Typography variant="h6" color="text.secondary">
                  Finding available skips in {area}...
                </Typography>
              </Box>
            </Box>
          ) : error ? (
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
                  onClick={loadSkips}
                  startIcon={<ReplayIcon />}
                  sx={{ mt: 1 }}
                >
                  Retry Search
                </Button>
              </Box>
            </Alert>
          ) : skips.length === 0 ? (
            <Alert 
              severity="info" 
              sx={{ 
                mb: 6, 
                maxWidth: 800, 
                mx: 'auto',
              }}
            >
              <AlertTitle>No Skips Available</AlertTitle>
              We couldn't find any skips matching your criteria in {area}. 
              Please try a different postcode or contact us for assistance.
            </Alert>
          ) : (
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
                    onClick={() => setActiveStep(1)}
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
                      onSelect={handleSkipSelect}
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
                          onClick={() => {
                            console.log('Button clicked!');
                            handleContinue();
                          }}
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
          )}
        </Container>

        {/* Confirmation Dialog */}
        <Dialog
          open={!!openConfirmDialog}
          onClose={handleBack}
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
                {selectedSkip ? `ID: ${selectedSkip}` : 'No skip selected'}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, justifyContent: 'space-between', borderTop: '1px solid', borderColor: 'divider' }}>
            <Button 
              onClick={handleBack} 
              variant="outlined"
              sx={{ minWidth: '120px' }}
            >
              Back
            </Button>
            <Button 
              onClick={handleConfirm} 
              variant="contained" 
              color="primary" 
              sx={{ minWidth: '160px' }}
            >
              Confirm Selection
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default App;
