import { TextField, Button, Grid, Paper, Box } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

interface SearchBarProps {
  postcode: string;
  area: string;
  onPostcodeChange: (value: string) => void;
  onAreaChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

export const SearchBar = ({
  postcode,
  area,
  onPostcodeChange,
  onAreaChange,
  onSearch,
}: SearchBarProps) => (
  <Box textAlign="center" mb={6}>
    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <LocalShippingIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
      <h1 style={{ margin: 0, color: '#1976d2' }}>We Want Waste</h1>
    </Box>
    <p style={{ color: '#666', marginBottom: '2rem' }}>
      Find the perfect skip for your waste disposal needs
    </p>
    
    <Paper 
      component="form" 
      onSubmit={onSearch}
      sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid xs={12} sm={5}>
          <TextField
            fullWidth
            label="Postcode"
            variant="outlined"
            value={postcode}
            onChange={(e) => onPostcodeChange(e.target.value)}
            required
          />
        </Grid>
        <Grid xs={12} sm={5}>
          <TextField
            fullWidth
            label="Area"
            variant="outlined"
            value={area}
            onChange={(e) => onAreaChange(e.target.value)}
            required
          />
        </Grid>
        <Grid xs={12} sm={2}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Paper>
  </Box>
);
