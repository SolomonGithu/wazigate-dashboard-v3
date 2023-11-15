import { AddCircleOutline, MoreVert,Router, SettingsTwoTone } from "@mui/icons-material";
import { Box,Breadcrumbs,Button,FormControl,Grid,  NativeSelect,  Typography } from "@mui/material";
import RowContainerBetween from "../components/RowContainerBetween";
import { Link, useLocation } from "react-router-dom";
import { ChangeEvent } from "react";
export interface HTMLSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    handleChange:(event: ChangeEvent<HTMLSelectElement>)=>void,
    title:string,
    conditions:string[] | number[], 
    value: string
    isDisabled?:boolean
    matches?:boolean
}
export const SelectElement = ({handleChange,title,conditions,isDisabled, value}:HTMLSelectProps)=>(
    <Box minWidth={120} >
        <Typography  fontSize={12} fontWeight={'300'} color={'#292F3F'}>{title}</Typography>
        <FormControl disabled={isDisabled} fullWidth>
            <NativeSelect
                defaultValue={30}
                inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                }}
                sx={{fontWeight:'bold'}}
                value={value}
                onChange={handleChange}
            >
                {conditions.map((condition,index)=>(
                    <option key={index} value={condition}>{condition}</option>
                ))}
            </NativeSelect>
        </FormControl>
    </Box>
);
const AddTextShow=({text,placeholder,}:{text:string,placeholder:string})=>(
    <Box sx={{my:2}}>
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center', borderBottom:'1px solid #ccc'}}>
            <Typography fontSize={16} my={.5} color={'#757474'} fontWeight={200} >{text}</Typography>
            <AddCircleOutline sx={{color:'#292F3F', fontSize:20}} />
        </Box>
        <Typography fontSize={10} my={.5} color={'#292F3F'} fontWeight={200}>{placeholder}</Typography>
    </Box>
)
export default function DeviceSettings(){
    function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    const {state} = useLocation();
    // const navigate = useNavigate()
    console.log(state);
    return(
        <Box mx={2} m={2}>
            <RowContainerBetween additionStyles={{mx:2}}>
                <Box>
                    <Typography fontWeight={700} color={'black'}>{state.name}</Typography>
                    <div role="presentation" onClick={handleClick}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link style={{color:'#292F3F',textDecoration:'none'}} state={{title:'Devices'}} color="inherit" to="/devices">
                                Devices
                            </Link>
                            
                            <Link
                                color="inherit"
                                state={{title:state.name}}
                                to={`/devices/${state.id}`}
                                style={{color:'#292F3F',textDecoration:'none'}}
                            >
                                {state.name?state.name.slice(0,10)+'...':''}
                            </Link>
                            <Typography color="text.primary">
                                Settings
                            </Typography>
                        </Breadcrumbs>
                    </div>
                </Box>
                <Button  color="info" variant={'contained'}>
                    <SettingsTwoTone sx={{color:'#fff'}}/>
                    <Typography color={'#fff'}>Settings</Typography>
                </Button>
            </RowContainerBetween>
            <Grid m={2} container >
                <Grid bgcolor={'#fff'} mx={2} item md={6} px={2} py={2} borderRadius={2} lg={5} xl={5} sm={8} xs={11}>
                    <RowContainerBetween>
                        <Box display={'flex'} my={1} alignItems={'center'}>
                            <Router sx={{ fontSize: 20, color:'#292F3F' }} />
                            <Typography fontWeight={500} mx={2}  fontSize={16} color={'#292F3F'}>LoRaWAN Settings</Typography>
                        </Box>
                        <MoreVert sx={{color:'black', fontSize:20}} />
                    </RowContainerBetween>
                    <Box my={2}>
                        <SelectElement title={'Application Type'} handleChange={()=>{}} conditions={['Tempeature','Level','Humidity']} value={'Temperature'} />
                        <AddTextShow text={'Device Addr (Device Address)'}  placeholder={'8 digits required, got 0'} />
                        <AddTextShow text={'NwkSKey(Network Session Key)'}  placeholder={'32 digits required, got 0'} />
                        <AddTextShow text={'AppKey (App Key)'}  placeholder={'32 digits required, got 0'} />
                    </Box>
                </Grid>
                <Grid bgcolor={'#fff'} mx={2} item md={6} px={2} py={2} borderRadius={2} lg={5} xl={5} sm={8} xs={11}>
                    <RowContainerBetween>
                        <Box display={'flex'} my={1} alignItems={'center'}>
                            <Box component={'img'} src={'/box_download.svg'} width={20} height={20} />
                            <Typography fontWeight={500} mx={2}  fontSize={16} color={'#292F3F'}>Device Codec</Typography>
                        </Box>
                        <MoreVert sx={{color:'black', fontSize:20}} />
                    </RowContainerBetween>
                    <Box my={2}>
                        <SelectElement title={'Application Type'} handleChange={()=>{}} conditions={['Tempeature','Level','Humidity']} value={'Temperature'} />
                        <AddTextShow text={'Device Addr (Device Address)'}  placeholder={'8 digits required, got 0'} />
                        <AddTextShow text={'NwkSKey(Network Session Key)'}  placeholder={'32 digits required, got 0'} />
                        <AddTextShow text={'AppKey (App Key)'}  placeholder={'32 digits required, got 0'} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}