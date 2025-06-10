import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActions,
  Typography, 
  Button, 
  Box, 
  Chip, 
  Tooltip, 
  styled,
  useTheme,
  alpha
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { type Skip, calculateTotalPrice, formatPrice } from '../../types/skip';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${isSelected ? theme.palette.primary.light : theme.palette.grey[200]}`,
  borderRadius: 12,
  overflow: 'hidden',
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    borderColor: isSelected ? theme.palette.primary.main : theme.palette.grey[300],
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    transform: 'translateY(-2px)',
  },
}));

const SkipImage = styled('div')({
  position: 'relative',
  height: '160px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f8f9fa',
  overflow: 'hidden',
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  '& .size-badge': {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 600,
    zIndex: 1,
  },
});

const PriceTag = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  backgroundColor: alpha(theme.palette.primary.light, 0.1),
  borderRadius: 20,
  marginBottom: theme.spacing(2),
  '& .price': {
    fontWeight: 700,
    fontSize: '1.5rem',
    lineHeight: 1.2,
    color: theme.palette.primary.main,
  },
  '& .original-price': {
    fontSize: '0.9rem',
    color: theme.palette.text.secondary,
    textDecoration: 'line-through',
    marginLeft: theme.spacing(1),
  },
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
  '&:last-child': {
    borderBottom: 'none',
  },
  '& .label': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
  },
  '& .value': {
    fontWeight: 500,
    textAlign: 'right',
  },
}));

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  const theme = useTheme();
  const hirePeriod = skip.hire_period_days || 14;
  const totalPrice = calculateTotalPrice(skip);
  const formattedPrice = formatPrice(totalPrice);
  const transportIncluded = skip.transport_cost !== null;
  const skipImage = skip.image || `/skip-${skip.size}yd.jpg`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/skip-placeholder.png';
  };

  const handleSelect = () => {
    onSelect(skip.id);
  };

  return (
    <StyledCard isSelected={isSelected}>
      <SkipImage>
        <img 
          src={skipImage} 
          alt={`${skip.size} yard skip`}
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            objectFit: 'contain',
            transition: 'all 0.3s ease',
            filter: isSelected ? 'none' : 'grayscale(10%)',
            opacity: isSelected ? 1 : 0.92,
          }}
          onError={handleImageError}
        />
        <Box className="size-badge">{skip.size} yd³</Box>
      </SkipImage>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            {skip.size} Yard Skip
          </Typography>
          
          <PriceTag>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <span className="price">£{skip.price_before_vat.toFixed(2)}</span>
                <Typography variant="caption" color="text.secondary">
                  (Total: {formattedPrice} incl. VAT)
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {hirePeriod} day{hirePeriod > 1 ? 's' : ''} hire
              </Typography>
            </Box>
          </PriceTag>
        </Box>

        <Box sx={{ mb: 2 }}>
          <InfoRow>
            <Typography variant="body2" className="label">
              <LocalShippingIcon fontSize="small" />
              Delivery
            </Typography>
            <Typography variant="body2" className="value">
              {transportIncluded ? 'Included' : 'Not included'}
            </Typography>
          </InfoRow>

          <InfoRow>
            <Typography variant="body2" className="label">
              <DangerousIcon fontSize="small" />
              Road Placement
            </Typography>
            <Typography variant="body2" className="value">
              {skip.allowed_on_road ? 'Allowed' : 'Not allowed'}
              {skip.allowed_on_road && skip.requires_permit && (
                <Tooltip title="A permit may be required from your local council">
                  <HelpOutlineIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                </Tooltip>
              )}
            </Typography>
          </InfoRow>

          <InfoRow>
            <Typography variant="body2" className="label">
              <CheckCircleOutlineIcon fontSize="small" />
              Heavy Waste
            </Typography>
            <Typography variant="body2" className="value">
              {skip.allows_heavy_waste ? 'Allowed' : 'Not Allowed'}
            </Typography>
          </InfoRow>

          <InfoRow>
            <Box className="label">
              <HelpOutlineIcon fontSize="small" />
              <Typography variant="body2">Waste Types</Typography>
            </Box>
            <Box className="value" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {skip.waste_types?.slice(0, 2).map((type, index) => (
                <Chip 
                  key={index}
                  label={type}
                  size="small"
                  sx={{
                    fontSize: '0.65rem',
                    height: 20,
                    bgcolor: alpha(theme.palette.primary.light, 0.1),
                    color: theme.palette.primary.dark,
                    mr: 0.5,
                    mb: 0.5
                  }}
                />
              )) || (
                <Typography variant="caption" color="text.secondary">
                  No waste types specified
                </Typography>
              )}
              {skip.waste_types && skip.waste_types.length > 2 && (
                <Tooltip 
                  title={skip.waste_types.slice(2).join(', ')}
                  arrow
                >
                  <Chip 
                    label={`+${skip.waste_types.length - 2} more`}
                    size="small"
                    sx={{
                      fontSize: '0.65rem',
                      height: 20,
                    }}
                  />
                </Tooltip>
              )}
            </Box>
          </InfoRow>

          {skip.transport_cost !== null && (
            <InfoRow>
              <Typography variant="body2" className="label">
                <LocalShippingIcon fontSize="small" />
                Delivery Cost:
              </Typography>
              <Typography variant="body2" className="value">
                £{skip.transport_cost.toFixed(2)} (included in total)
              </Typography>
            </InfoRow>
          )}
          {skip.per_tonne_cost !== null && (
            <InfoRow>
              <Typography variant="body2" className="label">
                Additional Cost:
              </Typography>
              <Typography variant="body2" className="value">
                £{skip.per_tonne_cost.toFixed(2)}/tonne
              </Typography>
            </InfoRow>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0, mt: 'auto' }}>
        <Button
          fullWidth
          variant={isSelected ? 'contained' : 'outlined'}
          color="primary"
          onClick={handleSelect}
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: 'none',
            letterSpacing: 0.5,
            ...(isSelected && {
              boxShadow: '0 4px 14px rgba(58, 134, 255, 0.35)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(58, 134, 255, 0.4)',
              },
            }),
          }}
        >
          {isSelected ? 'Selected' : 'Select Skip'}
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export { SkipCard };
