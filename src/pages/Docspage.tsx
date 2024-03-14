import { Box, Typography } from '@mui/material';
import { DEFAULT_COLORS } from '../constants';
import { DataObject, DescriptionOutlined, MailOutline } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
interface TextElement extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    text: string;
    path: string;
}
const TextEL = ({children,path,text}:TextElement)=>(
    <Link to={path} style={{textDecoration:'none',cursor:'pointer'}}>
        <Typography sx={{fontWeight:500,mt:.5,cursor:'pointer',display:'flex',alignItems:'center',fontSize:15,color:DEFAULT_COLORS.primary_blue}}>
            {children}
            {text}
        </Typography>
    </Link>
)
function Docspage() {
    return (
        <Box p={3} sx={{ height:'100%'}}>
            <Box mx={2}>
                <Typography fontWeight={500} fontSize={20} color={'black'}>WaziGate Help</Typography>
                <Typography>Any problem using the WaziGate? Dont Worry!  Help is on the way.</Typography>
                <Box mt={2}>
                    <TextEL path="/apps/waziup.wazigate-system/docs/" text='Wazigate Edge Documetation'>
                        <DescriptionOutlined/>
                    </TextEL>
                    <TextEL path='/docs' text='API Documentation'>
                        <DataObject/>
                    </TextEL>
                    <TextEL path='' text='Contact'>
                        <MailOutline/>
                    </TextEL>
                </Box>
            </Box>
        </Box>
    );
}

export default Docspage;