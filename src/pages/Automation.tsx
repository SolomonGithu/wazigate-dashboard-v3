import { Add,Check,Clear, ModeOutlined, MoreVert, } from "@mui/icons-material";
import { Box, Button,FormControl,NativeSelect,Stack,Typography } from "@mui/material";
import { DEFAULT_COLORS } from "../constants";
import React, { ChangeEvent, } from "react";
import { useOutletContext } from "react-router-dom";
import { IconStyle } from "../components/layout/Sidebar";
import RowContainerBetween from "../components/RowContainerBetween";
export interface HTMLSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    handleChange:(event: ChangeEvent<HTMLSelectElement>)=>void,
    title:string,
    conditions:string[] | number[], 
    value: string
    isDisabled?:boolean
    matches?:boolean
}
export const SelectElement = ({handleChange,title,conditions,isDisabled, value}:HTMLSelectProps)=>(
    <Box minWidth={120} mx={2}>
        <Typography  fontSize={12} color={DEFAULT_COLORS.secondary_black}>{title}</Typography>
        <FormControl disabled={isDisabled} fullWidth>
            <NativeSelect
                defaultValue={30}
                inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                }}

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
function Automation() {
    const [age, setAge] = React.useState('');
    const [enableRuleEdit,setEnableRuleEdit] = React.useState(false);
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setAge(event.target.value);
    };
    const toggleRuleEdit = ()=>{setEnableRuleEdit(!enableRuleEdit)};
    const [matches] = useOutletContext<[matches: boolean]>()
    return (
        <>
            {
                matches?(
                    <Box p={3} sx={{ height:'100%'}}>
                        <RowContainerBetween>
                            <Box>
                                <Typography fontWeight={700} color={'black'}>Automation</Typography>
                                <Typography sx={{color:DEFAULT_COLORS.secondary_black}}>Setup your Actuation Logics</Typography>
                            </Box>
                            <Button variant={'contained'}>
                                <Add />
                                New Rule
                            </Button>
                        </RowContainerBetween>
                        <Box py={2}>
                            <Box sx={{ position:'relative', bgcolor: 'white', borderRadius:2, }}>
                                <Box sx={{position:'absolute',top:-5,my:-1,}} borderRadius={1} mx={1} bgcolor={DEFAULT_COLORS.primary_blue}>
                                    <Typography  mx={1} color={'white'} component={'span'}>Rule 1</Typography>
                                </Box>
                                <Box mx={2} py={2} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'} >
                                    <Box component={'img'} src={'/if.svg'} height={25} width={'10%'} />
                                    <SelectElement isDisabled={enableRuleEdit} title={'Sensor'} handleChange={handleChange} conditions={['Tempeature','Level','Humidity']} value={age} />
                                    <SelectElement isDisabled={enableRuleEdit} title={'Condition'} handleChange={()=>{}} conditions={['>','<','==']} value={''} />
                                    <SelectElement isDisabled={enableRuleEdit} title={'Values'} handleChange={()=>{}} conditions={[32,33,34,35,26]} value={''} />
                                    <Box component={'img'} src={'/do.svg'} height={25} width={'10%'} />
                                    <SelectElement isDisabled={enableRuleEdit} title={'Actuator'} handleChange={()=>{}} conditions={['WaterPump','<','==']} value={''} />
                                    <SelectElement isDisabled={enableRuleEdit} title={'Action'} handleChange={()=>{}} conditions={['on','off']} value={''} />
                                    <Box display={'flex'}>
                                        <ModeOutlined sx={{fontSize:20, color:'black',mx:1}}/>
                                        <MoreVert sx={{fontSize:20,color:'black',mx:1}}/>
                                    </Box>
                                </Box>     
                            </Box>
                        </Box>
                    </Box>
                ):(
                    <Box position={'relative'} height={'100%'} width={'100%'}>
                        <Stack flexDirection={'column'} width={'100%'} mt={4} display={'flex'} alignItems={'center'}>
                            <Box onClick={()=>{}} sx={{cursor:'pointer',width:'90%',py:2, height: '100%',position:'relative', bgcolor: 'white', borderRadius:2, }}>
                                <Box sx={{position:'absolute',top:-5,my:-1,}} borderRadius={1} mx={1} bgcolor={DEFAULT_COLORS.primary_blue}>
                                    <Typography fontSize={16} mx={1} color={'white'} component={'span'}>Rules 1</Typography>
                                </Box>
                                <Box sx={{px:2,}}>
                                    <RowContainerBetween>
                                        <Box component={'img'} sx={{m:1}} src={'/if.svg'} height={'10%'} width={'10%'} />
                                        <Box>
                                            {
                                                enableRuleEdit?(
                                                    <>
                                                        <Check onClick={toggleRuleEdit} sx={{...IconStyle,mx:1}} />
                                                        <Clear sx={{...IconStyle,mx:1}} />
                                                    </>
                                                ):(
                                                    <>
                                                        <ModeOutlined onClick={toggleRuleEdit} sx={{fontSize:20, color:'black',mx:1}}/>
                                                        <MoreVert sx={{fontSize:20,color:'black',mx:1}}/>
                                                    </>
                                                )

                                            }
                                        </Box>
                                    </RowContainerBetween>
                                </Box>
                                <SelectElement isDisabled={enableRuleEdit} title={'Sensor'} handleChange={handleChange} conditions={['Tempeature','Level','Humidity']} value={age} />
                                <SelectElement isDisabled={enableRuleEdit} title={'Condition'} handleChange={()=>{}} conditions={['>','<','==']} value={''} />
                                <SelectElement isDisabled={enableRuleEdit} title={'Values'} handleChange={()=>{}} conditions={[32,33,34,35,26]} value={''} />
                                <Box sx={{ px:2,}}>
                                    <Box component={'img'} sx={{m:1}} src={'/do.svg'} height={'10%'} width={'10%'} />
                                </Box>
                                <Box my={2}>
                                    <SelectElement isDisabled={enableRuleEdit} title={'Actuator'} handleChange={()=>{}} conditions={['WaterPump','<','==']} value={''} />
                                    <SelectElement isDisabled={enableRuleEdit} title={'Action'} handleChange={()=>{}} conditions={['on','off']} value={''} />
                                </Box>
                            </Box>
                        </Stack>
                        <Button variant={'contained'} sx={{position:'absolute',bottom:50,right:10,}}>
                            <Add/>
                        </Button>
                    </Box>
                )
            }
        </>
    );
}

export default Automation;