import React from 'react';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { white, green, blue, red } from '@mui/material/colors';

const LogInLogo = () => {
    return (
        <Grid item align = "center" justify = "center" alignItems = "center"
                sx={{  margin: "auto", width: 200, paddingBottom: 0 }}>
                    <img src='assets\img\HAL9001Logo.png' width={71} height={65}/>
            {/* <Avatar sx={{ m: 1, bgcolor: blue }}>
                <LockOutlinedIcon />
            </Avatar>
            <p>
            כניסה לTLV Box                
            </p>
            */}
            <br /><br /><br />
            <Typography component="div"  className='not-rotated' style={{margin:'-24px'}}> 
            כניסה לTLV Box
            </Typography>
   
            
        </Grid>        
    )
}

export default LogInLogo;