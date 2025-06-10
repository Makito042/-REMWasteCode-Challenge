import { useState, useEffect } from 'react';
import { 
  Container, 
  Box,
  Alert,
  AlertTitle,
  ThemeProvider, 
  CssBaseline,
  useTheme
} from '@mui/material';

import { StepperComponent } from './components/Stepper/StepperComponent';
import { SearchForm } from './components/SearchForm/SearchForm';
import { LoadingState } from './components/LoadingState/LoadingState';
import { ErrorState } from './components/ErrorState/ErrorState';
import { SkipList } from './components/SkipList/SkipList';
import { ConfirmationDialog } from './components/ConfirmationDialog/ConfirmationDialog';
import { PageHeader } from './components/PageHeader/PageHeader';
import { type Skip } from './types/skip';
import { fetchSkips, getMockedSkips } from './api/skipService';

const App = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(2); // Skip Selection is step 3 (0-indexed)
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [postcode, setPostcode] = useState<string>('NR32');
  const [area, setArea] = useState<string>('Lowestoft');
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  
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
            <StepperComponent activeStep={activeStep} />
          </Box>

          <PageHeader activeStep={activeStep} />

          {activeStep <= 1 && (
            <SearchForm
              postcode={postcode}
              area={area}
              onPostcodeChange={handlePostcodeChange}
              onAreaChange={handleAreaChange}
              onSubmit={handleSearch}
            />
          )}

          {loading ? (
            <LoadingState area={area} />
          ) : error ? (
            <ErrorState error={error} onRetry={loadSkips} />
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
            <SkipList
              skips={skips}
              area={area}
              selectedSkip={selectedSkip}
              onSkipSelect={handleSkipSelect}
              onLocationChange={() => setActiveStep(1)}
              onContinue={handleContinue}
            />
          )}
        </Container>

        <ConfirmationDialog
          open={openConfirmDialog}
          selectedSkipId={selectedSkip}
          onBack={handleBack}
          onConfirm={handleConfirm}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
