import { 
  Stepper,
  Step,
  StepLabel,
  styled,
  useTheme,
  useMediaQuery,
  type StepIconProps
} from '@mui/material';
import { Search as SearchIcon, Check as CheckIcon } from '@mui/icons-material';

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

interface StepperComponentProps {
  activeStep: number;
}

export const StepperComponent = ({ activeStep }: StepperComponentProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
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
  );
};