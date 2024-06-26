import React from 'react';

import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

const LogInLogo = () => {
    return (
        <Grid item align = "center" justify = "center" alignItems = "center">
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className='not-rotated'>
                כניסה למערכת
            </Typography>            
        </Grid>        
    )
}

export default LogInLogo;