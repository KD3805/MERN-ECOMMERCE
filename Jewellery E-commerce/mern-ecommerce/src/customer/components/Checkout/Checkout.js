import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PaymentIcon from '@mui/icons-material/Payment';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: '#ED213A',
            background: '-webkit-linear-gradient(to right, #93291E, #ED213A)',
            background: 'linear-gradient(to right, #93291E, #ED213A)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: '#ED213A',
            background: '-webkit-linear-gradient(to right, #93291E, #ED213A)',
            background: 'linear-gradient(to right, #93291E, #ED213A)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        background: '#ED213A',
        background: '-webkit-linear-gradient(to right, #93291E, #ED213A)',
        background: 'linear-gradient(to right, #93291E, #ED213A)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        background: '#ED213A',
        background: '-webkit-linear-gradient(to right, #93291E, #ED213A)',
        background: 'linear-gradient(to right, #93291E, #ED213A)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <LoginIcon />,
        2: <LocationOnIcon />,
        3: <EventNoteIcon />,
        4: <PaymentIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['Login', 'Dilivery Address', 'Order Summary', 'Payment'];

export default function Checkout() {
    const location = useLocation();
    const querySearch = new URLSearchParams(location.search);
    const [activeStep, setActiveStep] = React.useState(querySearch.get("step"));
    const navigate = useNavigate();

    const step = querySearch.get('step');

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        <div className='p-10 lg:px-20 lg:py-10' onLoad={() => {
            // const isAuthenticated = ;

            if(!(localStorage.getItem('jwt') !== null)) {
                navigate('/login')
                return;
            }
        }}>
            <Stack sx={{ width: '100%' }}>
                <Stepper alternativeLabel activeStep={querySearch.get("step")} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Stack>

            {
                step == 2 ? <DeliveryAddressForm /> : <OrderSummary />
            }
        </div>
    );
}