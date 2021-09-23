import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  Select  from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TranslateIcon from '@material-ui/icons/Translate';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CssBaseline, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import {BrowserRouter as Router } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    
    appbar:{
        backgroundColor:' #0d47a1 ',
        color:'#fff'
    },
    button:{
        backgroundColor:' #0d47a1 ',
    },
    copy:{
        color:'white'
    },
    icon:{
        color:'white'
    },
    Icons:{
        color:'white'
    }
  }));


export default function Translate() {
    const classes = useStyles();
    const [inputText, setInputText] = useState('');
    const [detectLanguageKey, setdetectedLanguageKey] = useState('');
    const [selectedLanguageKey, setLanguageKey] = useState('')
    const [languagesList, setLanguagesList] = useState([])
    const [resultText, setResultText] = useState('');
    const [open, setOpen] = React.useState(true);
    const [name , setName] = useState();

    const getLanguageSource = () => {
        axios.post(`https://libretranslate.de/detect`, {
            q: inputText
        })
            .then((response) => {
                setdetectedLanguageKey(response.data[0].language)
            })
    }
    useEffect(() => {
        axios.get(`https://libretranslate.de/languages`)
            .then((response) => {
                setLanguagesList(response.data)
            })
    }, [])

    const languageKey = (selectedLanguage) => {
        setLanguageKey(selectedLanguage.target.value)
    }

    const translateText = () => {
        getLanguageSource();

        let data = {
            q : inputText,
            source: detectLanguageKey,
            target: selectedLanguageKey
        }
        axios.post(`https://libretranslate.de/translate`, data)
        .then((response) => {
            setResultText(response.data.translatedText)
        })
    }

   
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        setOpen(false);
        return name;
        
    }

    return (

     <Router>
     <div className="root">
         <CssBaseline/>
    <AppBar position="static" className={classes.appbar}>
                 <Toolbar variant="dense">  
        <IconButton edge="start"  color="inherit" aria-label="menu">
                    <TranslateIcon fontSize="large" />
                </IconButton>
            <Typography variant="h5" color="inherit"  className="title">
                Text Translator
                </Typography>
                <Typography variant="h5" color="inherit" >
                    <IconButton href="https://www.instagram.com/thisisvikasmourya/" className={classes.Icons}>
                      <InstagramIcon fontSize="large"/>
                      </IconButton>
              </Typography>
            <Typography variant="h5" color="inherit" >
                <IconButton href="https://github.com/thisisvikasmourya" className={classes.Icons}> 
                 <GitHubIcon fontSize="large"/>
                 </IconButton>
            </Typography>
        </Toolbar>
    </AppBar>
<Paper>
    <div className="app-header">
         <h1>Hello✨ {name} 👨</h1>
          </div>
              <div className='app-body'>
                 <div>       
                       <TextField
                                
                          id="filled-basic" variant="outlined"
                          onChange={(e) => setInputText(e.target.value)}
                          fullWidth
                          label="type your text here"
                        />
                        &nbsp;&nbsp;&nbsp;
                     <InputLabel id="demo-simple-select-label">Please Select Language..</InputLabel>
                     <Select 
                     native
                     fullWidth
                     className="language-select" onChange={languageKey}>
                         {languagesList.map((language) => {
                             return (
                                 <option value={language.code}>
                                     {language.name}
                                 </option>
                             )
                         })}
                     </Select>
    &nbsp;&nbsp;&nbsp;
                 <TextField
                     id="filled-basic" label="Your result translation" variant="outlined"
                     value={resultText}
                     fullWidth
                 />
                 <br/>
                 <br/>
                 <Button
                     className={classes.button}
                     variant="contained"
                     size="large"
                     onClick={translateText}
                     color="primary"
                  >
                     <TranslateIcon/>
                     Translate</Button>
                    </div>


            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Howdy!!!</DialogTitle>
            <DialogContent>
            <DialogContentText>
            TextTranslator is currently translate in 17 language in first version
            In Upcoming version it translate more than 100 language
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter Your Name "
                type="text"
                onChange={(e) => setName(e.target.value)}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                Ok
            </Button>
            </DialogActions>
        </Dialog>

                </div>
                <footer className="footer">
        <Typography variant="h6" align="center"  className={classes.icon}>
                 <IconButton href="https://www.instagram.com/thisisvikasmourya/" className={classes.Icons}>
                     Follow &nbsp; <InstagramIcon/>
                 </IconButton> 
                 <IconButton className={classes.Icons} href="https://github.com/thisisvikasmourya">
                     <GitHubIcon />
                 </IconButton>
        </Typography>    
        <Typography variant="h6" align="center" gutterBottom>
        <TranslateIcon fontSize="small" /> Text translator
        </Typography>
        <Typography variant="subtitle1" align="center" className={classes.copy} component="p">
            Translate in 17 language 
            version 1.0.1
        </Typography>
            
       <Typography variant="body2" className={classes.copy} align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/thisisvikasmourya">
            Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
       </Typography>
      </footer>
</Paper>
       </div>
    
       </Router>
            


    )
}