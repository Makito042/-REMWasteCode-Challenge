import {
  Paper,
  Grid,
  TextField,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchFormProps {
  postcode: string;
  area: string;
  onPostcodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAreaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchForm = ({
  postcode,
  area,
  onPostcodeChange,
  onAreaChange,
  onSubmit
}: SearchFormProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper 
      component="form" 
      onSubmit={onSubmit}
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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label="Postcode"
            value={postcode}
            onChange={onPostcodeChange}
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
            onChange={onAreaChange}
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
  );
};