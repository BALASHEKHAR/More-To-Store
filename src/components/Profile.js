import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Logo from '../media/Logo.png';
import firebase from '../firebase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
   backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [backdrop,setBackdrop] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };

  const handleClickOpen22 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };


  const user = firebase.auth().currentUser;
  const emailVerified1 = () =>{
  	if(user.emailVerified ===false){
   	return "false";
   }
   else{
   	return "true"
   }
  }
   
  return (
    <div className={classes.root}>

    <img style={{height:"100px",width:"100%" ,objectFit:"scale-down"}} src={Logo} alt="jagan" />
      <br/><br/><Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>General</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Name : {user.displayName}
            <br/><br/>
            Email : {user.email}
            <br/><br/>
            phoneNumber : {user.phoneNumber}
            <br /><br/>
            Verified : {emailVerified1()}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>User history</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
            diam eros in elit. Pellentesque convallis laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Danger Zone</Typography>
        </AccordionSummary>
        <AccordionDetails style={{background:"coral"}}>
          <div>
            Think once before you want to delete. Once you delete your account you need not to allow to see your data again.
            <br/><br/>
            <Button 
	         variant="contained" 
	         color="secondary"
	          onClick={handleClickOpen}>
	         Delete
	         </Button>
           <br/> <br/>
          <hr />
           <br/>
          <Typography>
          clear all my history and reset my account.
          </Typography>
          <br/>          
            <Button 
           variant="contained" 
           color="secondary"
           onClick={handleClickOpen22}>
           Clear history
           </Button>
          </div>
        </AccordionDetails>
      </Accordion>
      <Backdrop style={{zIndex:"1500"}} open={backdrop} onClick={handleClose}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Dialog
        open={open1}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">{"Delete Account ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
           Cancel
          </Button>
          <Button onClick={()=>{

          var user = firebase.auth().currentUser;
          setBackdrop(true);
          user.delete().then(function() {
            // User deleted.
          }).catch(function(error) {
            // An error happened.
          });
          }} color="primary" autoFocus>
            Ok
          </Button>
          

        </DialogActions>
      </Dialog>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">{"Delete Account ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to clear history of this account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose2} color="primary">
           Cancel
          </Button>
          <Button onClick={()=>{console.log("history tapped")
          }} color="primary" autoFocus>
            Ok
          </Button>
          

        </DialogActions>
      </Dialog>
      
    </div>
  );
}
