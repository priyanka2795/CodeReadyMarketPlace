import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from "react-bootstrap"
import Join from './Join';
import Main from '../auth/Main';
import AuthorInfo from './AuthorInfo';
import WhatToSell from './WhatToSell';
import WhatToSellItemInfo from './WhatToSellItemInfo';


const steps = ['1', '2', '3', '4', '5'];
const Steppers = (props) => {
    const [activeStep, setActiveStep] = React.useState(0);
   



    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const handlePrev = () => {
        setActiveStep(activeStep - 1);
    };

    const getStepsItems = (step) => {
        switch (step) {
            case 0:
                return <Join handleNext={handleNext} />;
            case 1:
                return <Main handleNext={handleNext} />;
            case 2:
                return <AuthorInfo handleNext={handleNext} />;
            case 3:
                return <WhatToSell handleNext={handleNext} />;
            case 4:
                return <WhatToSellItemInfo  handlePrev={handlePrev} />;
            default:
               break; 
        }
    }

    return (
        <>
            {/* <section className="stepper_wrap">
                <Container>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={props.activeStep}>
                            {steps.map((label, index) => {
                                const labelProps = {};
                                return (
                                    <Step key={label} >
                                        <StepLabel {...labelProps}></StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>

                    </Box>
                </Container>
            </section> */}
              <section className="stepper_wrap">
                <Container>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const labelProps = {};
                                return (
                                    <Step key={label} >
                                        <StepLabel {...labelProps}></StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>

                    </Box>
                </Container>
            </section>
            {getStepsItems(activeStep)}

        </>
    )
}

export default Steppers