import {Box, Button, CircularProgress, FormControl,  Grid,  InputLabel, ListItemText,  MenuItem,  Select,SelectChangeEvent,Tooltip, Typography} from '@mui/material';
import { NormalText,  } from './Dashboard';
import RowContainerBetween from '../components/RowContainerBetween';
import { DEFAULT_COLORS } from '../constants';
import { DeleteForever, Download, FiberNew, MoreVert, Settings, } from '@mui/icons-material';
import React,{useState,useEffect, useContext} from 'react';
import { useOutletContext } from 'react-router-dom';
import { type App } from 'waziup';
import Backdrop from '../components/Backdrop';
import { DevicesContext } from '../context/devices.context';
type App1 =App &{
    description:string
}
const onCloseHandler= ()=>{
    setTimeout(() => {
        if (document?.activeElement) {
            (document.activeElement as HTMLElement).blur();
        }
    }, 0);
            
}
const DropDown = ({handleChange,matches,recommendedApps,customAppInstallHandler, age}:{customAppInstallHandler:()=>void, matches:boolean,recommendedApps:RecomendedApp[], handleChange:(e: SelectChangeEvent)=>void,age: string})=>(
    <FormControl sx={{p:0, border:'none', width: matches?'35%':'45%', }}>
        <InputLabel id="demo-simple-select-helper-label">Install App</InputLabel>
        <Select sx={{width:'100%',py:0,}} 
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper" 
            onClose={onCloseHandler} 
            value={age} label="Age" onChange={handleChange}>
            {
                recommendedApps.map((app)=>(
                    <MenuItem key={app.id} value={app.image + "*"+app.id} sx={{display:'flex',width:'100%', justifyContent:'space-between'}}>
                        <Box display={'flex'} alignItems={'center'}>
                            <Box component={'img'} sx={{width:20,mx:1, height:20}} src='/wazilogo.svg' />
                            <Tooltip color='black' followCursor  title={app.description} placement="top-start">
                                <Typography fontSize={14} color={'#325460'} >{app.description.slice(0,30)+'...'}</Typography>
                            </Tooltip>
                        </Box>
                        <Box display={'flex'} alignItems={'center'}>
                            <Download sx={{fontSize:15,mx:1,color:'#325460'}} />
                            <Typography sx={{textTransform:'uppercase', color:'#325460', fontSize:11}}>
                                Install
                            </Typography>
                        </Box>
                    </MenuItem>
                ))
            }
            <MenuItem onClick={customAppInstallHandler} value={20} sx={{display:'flex',py:1,width:'100%',borderTop:'1px solid black', justifyContent:'space-between'}}>
                <Box display={'flex'} alignItems={'center'}>
                    <FiberNew sx={{fontSize:20,mx:1,color:'#F48652'}}/>
                    <Typography color={'#325460'} fontSize={15}>Install Custom App</Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                    <Download sx={{fontSize:20,mx:1,color:'#325460'}} />
                    <Typography sx={{textTransform:'uppercase', color:'#325460', fontSize:15}}>
                        Install
                    </Typography>
                </Box>
            </MenuItem>
            
        </Select>
        
    </FormControl>
);
export const GridItem=({children}:{children:React.ReactNode})=>(
    <Grid item md={6} lg={4} xl={4}  sm={6} xs={12} minHeight={100} my={1} px={1} >
        <Box minHeight={100} sx={{px:2, py:1, position:'relative', bgcolor: 'white', borderRadius:2, }}>
            {children}
            <Button sx={{fontWeight:'500',bgcolor:'#F4F7F6',my:1, color:'info.main',width:'100%'}}>OPEN</Button>
        </Box>
    </Grid>
);
type RecomendedApp={
    description:string,
    id:string,
    image:string,
}
export default function Apps() {
    const [matches] = useOutletContext<[matches: boolean]>();
    const [loadingUninstall,setLoadingUninstall] = React.useState<boolean>(false);
    const [open,setOpen] = useState(false);
    const [modalProps, setModalProps] = useState<{ open: boolean, title: string, children: React.ReactNode }>({ open: false, title: '', children: null });
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        // setAnchorEl(null);
        setOpen(false);
    };
    const {apps,getApps} =useContext(DevicesContext);
    const [recommendedApps,setRecommendedApps] = useState<RecomendedApp[]>([]);
    const [logs,setLogs] = useState<string>('');
    const logsRef = React.useRef<string>('');
    const [error, setError] = useState<Error | null | string>(null);
    function installAppFunction(image:string,id:string){
        const myInterVal = setInterval(async ()=>{await fetchInstallLogs(id)},2000);
        window.wazigate.installApp(image).then((res)=>{
            console.log(res);
            clearInterval(myInterVal);
            logsRef.current = res as unknown as string;
            setLogs(res as unknown as string);
        }).catch((err)=>{
            console.log(err);
            clearInterval(myInterVal);
            setLogs(err as string);
        })
    }
    useEffect(() => {
        window.wazigate.get<RecomendedApp[]>('apps?available').then((appsr)=>{
            setRecommendedApps(appsr);
        }
        , setError);
    }, []);
    const handleCustomAppIdChange = (e:React.ChangeEvent<HTMLInputElement>)=>{console.log(e.target.value); setCustomAppId(e.target.value)}
    const [customAppId,setCustomAppId] = useState<string>('');
    console.log(customAppId,'custom app id');
    
    function handleInstallAppModal(){
        setModalProps({open:true, title:'Install App', children:<>
            <Box  width={'100%'}  bgcolor={'#fff'}>
                <form onSubmit={(e)=>{e.preventDefault(); handleLogsModal(customAppId,customAppId)}}>
                    <Box borderBottom={'1px solid black'} px={2} py={2}>
                        <input style={{width:'100%',padding:'8px 4px',borderRadius:5, outline:'none',border:'1px solid  black'}} 
                            // value={customAppId} 
                            onInput={handleCustomAppIdChange}  
                            id="outlined-basic" required 
                            placeholder="docker image name and tag(image_name:tag)" 
                        />
                    </Box>
                    <Box py={2}>
                        <Button type='submit' variant={'contained'} sx={{mx:2}} color={'primary'}>Install</Button>
                        <Button onClick={()=>{setCustomAppId('');setLogs(''); closeModal()}} variant={'contained'} sx={{mx:2}} color={'error'}>Cancel</Button>
                    </Box>
                </form>
            </Box>
        </>});
    }
    
    function handleLogsModal(image:string, id:string){
        console.log('ID is: ',id);
        console.log('Image is: ',image);
        const appToInstall = apps.find((app)=>app.id===id);
        console.log(appToInstall);
        setModalProps({open:true, title:'Installing New App', children:<>
            <Box  width={'100%'} bgcolor={'#fff'}>
                <Box borderBottom={'1px solid black'} bgcolor={'black'} width={'100%'} mb={1} height={200} px={2} py={2}>
                    <Typography color={'#fff'}>{logsRef.current}</Typography>
                    <div style={{color:'#fff'}} dangerouslySetInnerHTML={{__html:logs}} />
                </Box>
                <Box  px={2} py={1}>
                    <Button variant={'contained'} sx={{mx:2}} color={'primary'}>DOWNLOAD</Button>
                    <Button onClick={closeModal} variant={'contained'} sx={{mx:2}} color={'error'}>CLOSE</Button>
                </Box>
            </Box>
        </>});
        installAppFunction(image,id);
    }
    const handleChangeLogsModal = (e: SelectChangeEvent)=>{
        console.log(e.target.value);
        if (parseInt(e.target.value) === 20) {
            console.log('we are installing a custom app');
            handleInstallAppModal();
            return;
        }
        const [image,id] = e.target.value.split('*');
        handleLogsModal(image, id);
    }
    const [uninstLoader,setUninstLoader] = useState<boolean>(false);
    const [showAppSettings,setShowAppSettings] = useState<boolean>(false);
    const [appToUninstall,setAppToUninstall] = useState<App | null>(null);
    async function fetchInstallLogs(id:string){
        await window.wazigate.get(`apps/${id}?install_logs`).then((logs)=>{
            logsRef.current = (logs as {log:string,done:boolean}).log as string;
            setLogs((logs as {log:string,done:boolean}).log as string);
            console.log((logs as {log:string,done:boolean}).log,'logs')
        }).catch((err)=>{
            setLogs(logs as string);
            console.log(err);
        })
    }
    const load = () => {
        window.wazigate.getApp(appToUninstall?appToUninstall.id:'').then(setAppToUninstall, (error) => {
          alert("There was an error loading the app info:\n" + error);
        });
    };
    useEffect(() => {
        
    },[]);
    console.log(logs,'logs in app component');
    const setAppToUninstallFc = (id:number)=>{
        console.log(id);
        const appToUninstallFind = apps[id];
        console.log(appToUninstallFind);
        setAppToUninstall(appToUninstallFind);
        // handleClose();
        setUninstLoader(!uninstLoader)
    }
    const uninstall = () => {

        console.log(appToUninstall);
        
        setLoadingUninstall(true)
        window.wazigate.uninstallApp(appToUninstall?appToUninstall?.id:'', false)
        .then((res) => {
            console.log(res);
            setUninstLoader(false);
            load();
            setAppToUninstall(null);
            getApps();
        }).catch((err)=>{
            // setAppToUninstall(null);
            console.log('error encountered',err);
            setLoadingUninstall(false);
            
        })
    };
    function closeModal(){
        setModalProps({open:false, title:'', children:null});
    }
    if (error) {
        return <div>Error: {(error as Error).message?(error as Error).message:(error as string)}</div>;
    }
    return (
        <>
            {
                modalProps.open &&
                <Backdrop>
                    <Box  width={matches?'40%':'90%'} bgcolor={'#fff'}>
                        <Box borderBottom={'1px solid black'} px={2} py={2}>
                            <Typography>{modalProps.title}</Typography>
                        </Box>
                        
                        <Box borderBottom={'1px solid black'}  py={2}>
                            {modalProps.children}
                        </Box>
                    </Box>
                </Backdrop>
            }
            {
                uninstLoader &&(
                    <Backdrop>
                        <Box  width={matches?'40%':'90%'} bgcolor={'#fff'}>
                            <Box borderBottom={'1px solid black'} px={2} py={2}>
                                <Typography>Do you wish to uninstall {appToUninstall?.name}</Typography>
                            </Box>
                            {
                                loadingUninstall &&(
                                    <Box borderBottom={'1px solid black'} width={'100%'} my={1}>
                                        <CircularProgress color='info'  />
                                    </Box>
                                )
                            }
                            <Box px={2} py={1}>
                                <Button onClick={uninstall} variant={'contained'} sx={{mx:2}} color={'primary'}>Uninstall</Button>
                                <Button onClick={()=>{setAppToUninstall(null); setUninstLoader(!uninstLoader)}} variant={'contained'} sx={{mx:2}} color={'error'}>Cancel</Button>
                            </Box>
                        </Box>
                    </Backdrop>
                )
            }
            {
                showAppSettings &&(
                    <Backdrop>
                        <Box width={matches?'40%':'90%'} bgcolor={'#fff'}>
                            <Box borderBottom={'1px solid black'} px={2} py={2}>
                                <Typography>App Settings</Typography>
                            </Box>
                            <Box px={2} py={1}>
                                <Button onClick={()=>{setShowAppSettings(!showAppSettings)}} variant={'contained'} sx={{mx:2}} color={'error'}>CLOSE</Button>
                            </Box>
                        </Box>
                    </Backdrop>
                )
            }
            <Box p={3} onClick={()=> {open?handleClose():null}} sx={{overflowY:'scroll',my:2, height:'100%'}}>
                <RowContainerBetween>
                    <Box maxWidth={'50%'}>
                        <Typography fontWeight={700} fontSize={20} color={'black'}>Apps</Typography>
                        <Typography fontSize={matches?15:13} sx={{color:DEFAULT_COLORS.secondary_black}}>Setup your Wazigate Edge Apps</Typography>
                    </Box>
                    <DropDown 
                        // installApp={handleLogsModal} 
                        customAppInstallHandler={handleInstallAppModal} 
                        recommendedApps={recommendedApps}
                        matches={matches} 
                        handleChange={handleChangeLogsModal} age={''} 
                    />
                </RowContainerBetween>
                <Grid container spacing={2} py={2}>
                    {
                        apps.map((app,idx)=>{
                            return(
                                <GridItem key={app.id}>
                                    <Box px={.4} display={'flex'} alignItems={'center'} sx={{position:'absolute',top:-5,my:-1,}} borderRadius={1} mx={1} bgcolor={DEFAULT_COLORS.primary_blue}>
                                        <Box component={'img'} src='/wazi_sig.svg' />
                                        <Typography fontSize={15} mx={1} color={'white'} component={'span'}>{app.author.name}</Typography>
                                    </Box>
                                    <Box display={'flex'} py={2}  justifyContent={'space-between'}>
                                        <Box>
                                            <NormalText title={app.name} />
                                            <Typography color={DEFAULT_COLORS.secondary_black} fontWeight={300}>{app.id}</Typography>
                                        </Box>
                                        <Box position={'relative'}>
                                            <Button id="demo-positioned-button"
                                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                                >
                                                <MoreVert sx={{color:'black'}}/>
                                            </Button>
                                            <Box boxShadow={1} position={'absolute'} p={1}borderRadius={2} right={-10} top={0} bgcolor={'#fff'} display={open  ?'block':'none'}>
                                                <Box onClick={()=>{handleClose()}} sx={{ display:'flex',alignItems:'center',cursor:'pointer'}}>
                                                    <Settings color={'primary'} sx={{mx:1}} fontSize="small" />
                                                    <ListItemText>settings</ListItemText>
                                                </Box>
                                                {
                                                    idx ?(
                                                        <Box onClick={()=>{setAppToUninstallFc(idx);handleClose()}} sx={{display:'flex',alignItems:'center',cursor:'pointer'}}  >
                                                            <DeleteForever sx={{mx:1}} color='primary' fontSize="small" />
                                                            <ListItemText color={'#292f3f'}>uninstall</ListItemText>
                                                        </Box>
                                                    ):null
                                                }
                                            </Box>
                                            
                                        </Box>
                                    </Box>
                                    <Typography fontSize={15} fontWeight={200} my={1} color={DEFAULT_COLORS.navbar_dark}>Status: <Typography component={'span'} fontSize={15} color={DEFAULT_COLORS.navbar_dark}>{app.state?app.state.running?'Running':'Stopped':'Running'}</Typography></Typography>
                                    <Typography fontSize={14} my={1} color={DEFAULT_COLORS.secondary_black}>{(app as App1).description.length>40?(app as App1).description.slice(0,39)+'...':(app as App1).description}</Typography>
                                </GridItem>
                        )})
                    }
                </Grid>
            </Box>
        </>
    );
}
