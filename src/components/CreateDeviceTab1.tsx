import { Box, FormControl, Typography, Radio, InputLabel, MenuItem, Select } from "@mui/material"
export const DropDownCreateDeviceTab1 = ({handleChangeSelect,options,selectedValue, age}:{selectedValue:string, handleChangeSelect:(e:React.ChangeEvent<HTMLInputElement>)=>void,  options:{name:string,imageurl:string}[], age: string})=>(
    <FormControl sx={{p:0,mt:2, border:'none', width: '100%', }}>
        <InputLabel id="demo-simple-select-helper-label">Select board Type</InputLabel>
        <Select sx={{width:'100%',py:0,}} labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper" onClose={()=>{
                setTimeout(() => {
                    if (document?.activeElement) {
                        (document.activeElement as HTMLElement).blur();
                    }
                }, 0);
            }} value={age} label="Age" onChange={()=>{}}>
                <MenuItem selected value="b">
                    <em>Nonffde</em>
                </MenuItem>
                {
                    options.map((op,idx)=>(
                        <MenuItem key={idx} onClick={()=>{}}  sx={{display:'flex',width:'100%', justifyContent:'space-between'}}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Box component={'img'} sx={{width:20,mx:1, height:20}} src={op.imageurl} />
                                <Typography fontSize={14} color={'#325460'} >{op.name}</Typography>
    
                            </Box>
                            <Radio
                                checked={selectedValue === 'a'}
                                onChange={handleChangeSelect}
                                value="a"
                                size='small'
                                sx={{color:'primary.main',fontSize:20}}
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                        </MenuItem>
                    ))
                }
        </Select>
        
    </FormControl>
);

export default function CreateDeviceTab1({handleChange,deviceName,handleChangeSelect,}:{deviceName:string,blockOnClick:(va:string)=>void,handleChange:(event: React.ChangeEvent<HTMLInputElement>)=>void,selectedValue:string,handleChangeSelect:(event: React.ChangeEvent<HTMLInputElement>)=>void}){
    
    return(
            <Box>
                <FormControl sx={{my:1,width:'100%', borderBottom:'1px solid black'}}>
                    <Typography color={'primary'} mb={.4} fontSize={12}>Device name</Typography>
                    <input autoFocus onInput={handleChange} name="name" placeholder='Enter device name' value={deviceName} style={{border:'none',width:'100%',padding:'6px 0', outline:'none'}}/>
                </FormControl>
                <DropDownCreateDeviceTab1 
                    age="a"  
                    handleChangeSelect={handleChangeSelect} 
                    selectedValue="b"  
                    options={[{name:'Wazidev Board',imageurl:'wazidev.svg'},{name:'Generic board',imageurl:'/WaziAct.svg'}]} 
                    
                />
                
            </Box>
        
    )
}