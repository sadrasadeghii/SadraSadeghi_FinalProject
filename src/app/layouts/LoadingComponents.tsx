import { Backdrop, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
interface Props {
    message?: string;
}
const LoadingComponents = ({ message = "در حال بارگذاری..." }: Props) => {
    return (<Backdrop open={false} invisible={false}>
        <Box display={"flex"} justifyContent="center" alignItems="center" height={"100vh"} width="100wv">
            <CircularProgress color='secondary' />
            <Typography variant='h4' ml={2}>{message}</Typography>
        </Box>
    </Backdrop>)
};

export default LoadingComponents;
