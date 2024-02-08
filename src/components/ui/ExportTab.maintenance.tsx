import { Box,Grid, Typography,Icon,Button, styled,Paper,SxProps,Theme, } from '@mui/material';
import { DEFAULT_COLORS } from '../../constants';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import TextInputField from '../shared/TextInputField';
interface Props{
    matches?:boolean
}
const GridItem = ({ children, xs,md,additionStyles }: {xs:number,md:number,spacing?:number, matches: boolean, additionStyles?: SxProps<Theme>, children: React.ReactNode,  }) => (
    <Grid m={1} item xs={xs} md={md} spacing={3} sx={additionStyles} borderRadius={2}  >
        {children}
    </Grid>
);
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
}));
const IconStyle: SxProps<Theme> = { fontSize: 20, mr: 2, color: DEFAULT_COLORS.primary_black };

const GridItemEl=({ children, text, additionStyles, icon }: { additionStyles?: SxProps<Theme>, text: string, children: React.ReactNode, icon: string })=>(
    <Item sx={additionStyles}>
        <Box sx={{ display: 'flex', borderTopLeftRadius: 5, borderTopRightRadius: 5, bgcolor: '#D8D8D8', alignItems: 'center' }} p={1} >
            <Icon sx={IconStyle}>{icon}</Icon>
            <Typography color={'#212529'} fontWeight={500}>{text}</Typography>
        </Box>
        {children}
    </Item>
)
export default function ExportTabMaintenance({matches}:Props) {
    console.log(matches);
    const [searchParams,setSearchParams]=useSearchParams()
    const today = new Date();
    const updateSearchParams=(key:string,value:string)=>{
        setSearchParams({
            ...Object.fromEntries(searchParams),
            [key]:value
        })
    }
    return (
        <Box p={2}>
            <Typography fontWeight={900} fontSize={20}>Export Usage Data</Typography>
            <Typography fontSize={15} color={'#666666'}>
                In this section you are able to download the gateways data of all devices at once. You can use to perform a backup, to have all data in one place and for machine learning applications.
            </Typography>
            <Grid container>
                <GridItem  spacing={2} md={4.6} xs={12} matches={matches as boolean} >
                    <GridItemEl  icon={'sensors_outlined'} text={'Export Sensor Data'} >
                        <Typography m={1} fontSize={12} color={'#666666'}>
                            You can export the data of all sensors and actuators to a tree of CSV files:
                        </Typography>
                        <Button href='http://wazigate-dashboard-stable.staging.waziup.io/exporttree' variant="text" sx={{ color: '#fff', m: 1, bgcolor: 'info.main' }} >
                            EXPORT
                        </Button>
                    </GridItemEl>
                    <GridItemEl icon={'precision_manufacturing'} text={'Export Actuator data'} >
                        <Typography m={1} fontSize={12} color={'#666666'}>
                            You can export the data of all sensors and actuators to one CSV file:
                        </Typography>
                        <Button href='http://wazigate-dashboard-stable.staging.waziup.io/exportall' variant="text" sx={{ color: '#fff', m: 1, bgcolor: 'info.main' }} >
                            EXPORT
                        </Button>
                    </GridItemEl>
                </GridItem>
                <GridItem  spacing={2} md={7} xs={12} matches={matches as boolean} >
                    <GridItemEl icon={'sensor'} text={'Export Actuator and Sensor Data'} >
                        <Typography m={1} fontSize={12} color={'#666666'}>
                            You can export the data of all sensors and actuators to one CSV file. Additionally it also includes custom timespans and all data can be summarized in time bins. This is perfect for machine learning applications
                        </Typography>
                        <Box bgcolor={'#D4E3F5'} display={'flex'} justifyContent={'space-between'} borderRadius={1} p={1} m={2}>
                            <Box width={'45%'}>
                                <Typography>From:</Typography>
                                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                                    <DemoContainer
                                        components={[
                                            'DatePicker',

                                        ]}
                                    >
                                        <DemoItem label="">
                                            <DesktopDatePicker 
                                                onChange={(newValue) => {
                                                    updateSearchParams('from',(newValue as dayjs.Dayjs).toString())
                                                } }
                                                sx={{ p: 0 }} 
                                                defaultValue={dayjs(searchParams.get('from')?searchParams.get('from'):today.toLocaleDateString().toString().replaceAll('/', '-' + " "))} 
                                            />
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                            <Box>
                                <Typography>To:</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer
                                        components={[
                                            'DatePicker',
                                        ]}
                                    >
                                        <DemoItem label="">
                                            <DesktopDatePicker  
                                                sx={{ p: 0 }} 
                                                onChange={(newValue) => {
                                                    updateSearchParams('to',(newValue as dayjs.Dayjs).toString())
                                                } }
                                                defaultValue={dayjs(searchParams.get('to')?searchParams.get('to'):today.toLocaleDateString().toString().replaceAll('/', '-' + " "))} 
                                            />
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                            <Box>
                                <Typography>Bin Size in seconds: </Typography>
                                <TextInputField
                                    label="Bin Size in seconds"
                                    onChange={(ev) => {
                                        updateSearchParams('duration',ev.target.value)
                                    }}
                                    value={searchParams.get('duration')?searchParams.get('duration') as string:'0' }
                                />
                                <br/>
                            </Box>
                            <Box>
                                <Typography>Omit deviating values (20%) in between bins : </Typography>
                                <input type="checkbox" id="clear" name="clear"
                                    onChange={(ev) => {
                                        setSearchParams({
                                            ...Object.fromEntries(searchParams),
                                            'check':ev.currentTarget.checked?'true':'false'
                                        })
                                    }}>
                                </input>
                            </Box>
                        </Box>
                        <Button variant="text" sx={{ color: '#fff', m: 1, bgcolor: 'info.main' }} href={'http://wazigate-dashboard-stable.staging.waziup.io/exportbins?from='+searchParams.get('from')+'&to='+searchParams.get('to')+'&duration='+searchParams.get('duration')+'s'+'&check='+searchParams.get('check')} >
                            EXPORT
                        </Button>
                    </GridItemEl>
                </GridItem>
            </Grid>
        </Box>
    )
}
