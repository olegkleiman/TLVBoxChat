import React from 'react';

import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { white, green, blue, red } from '@mui/material/colors';

const LogInLogo = () => {
    return (
        <Grid item align = "center" justify = "center" alignItems = "center"
                sx={{  margin: "auto", width: 200, paddingBottom: 0 }}>
            <Avatar sx={{ m: 1, bgcolor: blue }}>
                <LockOutlinedIcon />
            </Avatar>
            {/* <Typography component="p" variant="h4" className='not-rotated'> */}
            <p>
                כניסה לTLV Box
            </p>
            {/* </Typography> */}
            
        </Grid>        
    )
}

export default LogInLogo;