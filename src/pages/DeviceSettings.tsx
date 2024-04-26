import { Router, } from "@mui/icons-material";
import { Box, Breadcrumbs, FormControl, Typography, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import RowContainerBetween from "../components/shared/RowContainerBetween";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AddTextShow from "../components/shared/AddTextInput";
import type { Device, } from "waziup";
import { DevicesContext } from "../context/devices.context";
import { toStringHelper } from "../utils";
import { SelectElementString } from "./Automation";
export interface HTMLSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    handleChange: (event: SelectChangeEvent<string>) => void,
    title: string,
    conditions: string[] | number[],
    value: string
    isDisabled?: boolean
    matches?: boolean
    widthPassed?: string
}
export const SelectElement = ({ handleChange, title, conditions, isDisabled, widthPassed, name, value }: HTMLSelectProps) => (
    <Box minWidth={120} width={widthPassed ? widthPassed : '100%'} my={.5}>
        <Typography fontSize={12} fontWeight={'300'} color={'#292F3F'}>{title}</Typography>
        <FormControl variant="standard" disabled={isDisabled} fullWidth>
            <Select
                inputProps={{
                    name: name,
                    id: 'uncontrolled-native',
                }}
                sx={{ fontWeight: 'bold' }}
                value={value}
                onChange={handleChange}
            >
                <MenuItem defaultChecked disabled value={''}>Select</MenuItem>
                {
                    conditions.map((condition, index) => (
                        <MenuItem key={index} value={condition}>{condition}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    </Box>
);
import BoxDownload from '../assets/box_download.svg';
import PrimaryButton from "../components/shared/PrimaryButton";
export default function DeviceSettings() {
    function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    const { codecsList,devices,getDevicesFc } = useContext(DevicesContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [matches] = useOutletContext<[matches: boolean, matchesMd: boolean]>();
    const [thisDevice, setThisDevice] = useState<Device>({
        id: '',
        name: '',
        actuators:[],
        sensors:[],
        created: new Date(),
        modified: new Date(),
        meta: {
            type: '',
            codec: '',
            lorawan: {
                devAddr: '',
                nwkSEncKey: '',
                appSKey: ''
            }
        }
    });
    const handleSubmitEditDevice = () => {
        const device = devices.find((dev) => dev.id === thisDevice?.id);
        if (thisDevice?.meta) {
            if (device?.meta !== thisDevice?.meta) {
                window.wazigate.setDeviceMeta(thisDevice?.id as string, thisDevice?.meta as Device)
                    .then(() => {
                        alert("Device meta updated");
                        getDevicesFc();
                        navigate('/devices')
                        return;
                    }).catch(err => {
                        alert("Error updating device meta"+err);
                    });
            }
            if (device?.name !== thisDevice?.name) {
                window.wazigate.setDeviceName(thisDevice.id as string, thisDevice.name.toString())
                    .then(() => {
                        alert("Device name updated");
                        return;
                    }).catch(err => {
                        alert("Error updating device name"+err);
                    });
            }
        }
        getDevicesFc();
        navigate('/devices')
    }
    useEffect(() => {
        window.wazigate.getDevice(id as string).then((de) => {
            setThisDevice(de);
        });
    }, [id]);
    const handleChangeDeviceCodec = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setThisDevice({
            ...thisDevice as Device,
            meta: {
                ...thisDevice?.meta,
                codec: event.target.value
            }
        })
    };
    const autoGenerateLoraWANOptions = (title: "devAddr" | "nwkSEncKey" | "appSKey") => {
        switch (title) {
            case 'devAddr':
                setThisDevice({
                    ...thisDevice,
                    meta: {
                        ...thisDevice.meta,
                        lorawan: {
                            ...thisDevice.meta.lorawan,
                            devAddr: Math.floor(Math.random() * 90000000) + 10000000,
                        }
                    }
                });
                break;
            case 'nwkSEncKey':
                setThisDevice({
                    ...thisDevice,
                    meta: {
                        ...thisDevice.meta,
                        lorawan: {
                            ...thisDevice.meta.lorawan,
                            nwkSEncKey: [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase(),
                        }
                    }
                });
                break;
            case 'appSKey':
                setThisDevice({
                    ...thisDevice,
                    meta: {
                        ...thisDevice.meta,
                        lorawan: {
                            ...thisDevice.meta.lorawan,
                            appSKey: [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase(),
                        }
                    }
                });
                break;
            default:
                break;
        }
    }
    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setThisDevice({
            ...thisDevice,
            meta: {
                ...thisDevice.meta,
                lorawan: {
                    [e.target.name]: e.target.value
                },
            }
        })
    }
    return (
        <>
            <Box mx={2} sx={{ height: '100%', overflowY: 'auto', scrollbarWidth: '.5rem', "::-webkit-slider-thumb": { backgroundColor: 'transparent' } }} m={2}>
                <RowContainerBetween additionStyles={{ mx: 2 }}>
                    <Box>
                        <Typography fontWeight={700} color={'black'}>{thisDevice?.name}</Typography>
                        <div role="presentation" onClick={handleClick}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link style={{ color: '#292F3F', fontSize: 15, textDecoration: 'none' }} state={{ title: 'Devices' }} color="inherit" to="/devices">
                                    Devices
                                </Link>

                                <Link
                                    color="inherit"
                                    state={{ title: thisDevice?.name }}
                                    to={`/devices/${id}`}
                                    style={{ color: '#292F3F', fontSize: 15, textDecoration: 'none' }}
                                >
                                    {thisDevice?.name ? thisDevice.name.slice(0, 10) + '...' : ''}
                                </Link>
                                <Typography fontSize={15} color="text.primary">
                                    settings
                                </Typography>
                            </Breadcrumbs>
                        </div>
                    </Box>
                </RowContainerBetween>
                <Box m={2} width={matches?'50%':'95%'}>
                    {
                        thisDevice?.meta.lorawan ? (
                            <Box bgcolor={'#fff'} mx={2} my={1} px={2} py={2} borderRadius={2} >
                                <RowContainerBetween>
                                    <Box display={'flex'} my={1} alignItems={'center'}>
                                        <Router sx={{ fontSize: 20, color: '#292F3F' }} />
                                        <Typography fontWeight={500} mx={2} fontSize={16} color={'#292F3F'}>LoRaWAN Settings</Typography>
                                    </Box>
                                </RowContainerBetween>
                                <Box my={2}>
                                    <AddTextShow 
                                        name="devAddr"
                                        onTextInputChange={handleTextInputChange}
                                        autoGenerateHandler={autoGenerateLoraWANOptions}
                                        textInputValue={thisDevice?.meta.lorawan.devAddr} 
                                        text={'Device Addr (Device Address)'} 
                                        placeholder={'8 digits required, got ' + toStringHelper(thisDevice?.meta.lorawan.devAddr)} 
                                    />
                                    <AddTextShow
                                        onTextInputChange={handleTextInputChange}
                                        autoGenerateHandler={autoGenerateLoraWANOptions}
                                        name="nwkSEncKey"
                                        textInputValue={thisDevice?.meta.lorawan.nwkSEncKey} 
                                        text={'NwkSKey(Network Session Key)'} 
                                        placeholder={'32 digits required, got ' + toStringHelper(thisDevice?.meta.lorawan.nwkSEncKey)}
                                    />
                                    <AddTextShow
                                        onTextInputChange={handleTextInputChange}
                                        autoGenerateHandler={autoGenerateLoraWANOptions}
                                        name="appSKey"
                                        textInputValue={thisDevice?.meta.lorawan.appSKey} 
                                        text={'AppKey (App Key)'} 
                                        placeholder={'32 digits required, got ' + toStringHelper(thisDevice?.meta.lorawan.appSKey)} 
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pt: 2 }} >
                                    <PrimaryButton onClick={()=>handleSubmitEditDevice()} type="button" title="Save" />
                                </Box>
                            </Box>
                        ) : null
                    }
                    <Box bgcolor={'#fff'} mx={2} my={2} px={2} py={2} borderRadius={2}>
                        <RowContainerBetween>
                            <Box display={'flex'} my={1} alignItems={'center'}>
                                <Box component={'img'} src={BoxDownload} width={20} height={20} />
                                <Typography fontWeight={500} mx={2} fontSize={16} color={'#292F3F'}>Device Codec</Typography>
                            </Box>
                        </RowContainerBetween>
                        <Box my={2}>
                            <SelectElementString title={'Codec type.'} handleChange={handleChangeDeviceCodec} name="codec" conditions={codecsList ? codecsList : []} value={thisDevice?.meta.codec} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pt: 2 }} >
                            <PrimaryButton onClick={()=>handleSubmitEditDevice()}  type="button" title="Save" />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}