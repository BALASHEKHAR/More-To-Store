import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded';
import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import firebase from '../firebase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Profile from '../components/Profile';
import Dashboard from '../components/Dashboard';
import Github from '../components/Github';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [fragment , setFragment] = React.useState("HOME");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };


  const onTabsChange = () =>{

     switch (fragment) {
      case "HOME":
      return < Dashboard />
      
      case "PROFILE":
      return < Profile />
      case "GITHUB":
      return < Github />

      default:
      break;
     }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="secondary"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Todo Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button onClick={e=>setFragment("HOME")}>
              <ListItemIcon> <PlaylistAddRoundedIcon /> </ListItemIcon>
              <ListItemText primary="My Todo's" />
            </ListItem>
        </List>
        <List>
            <ListItem button onClick={e=>setFragment("GITHUB")}>
              <ListItemIcon> <ArchiveRoundedIcon /> </ListItemIcon>
              <ListItemText primary="Archived" />
            </ListItem>
        </List>
        <List>
            <ListItem button>
              <ListItemIcon> <DoneAllRoundedIcon /> </ListItemIcon>
              <ListItemText primary="All Todo's" />
            </ListItem>
        </List>
        <List>
            <ListItem button>
              <ListItemIcon> <VisibilityOffRoundedIcon /> </ListItemIcon>
              <ListItemText primary="Hidden" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button onClick={e=>setFragment("PROFILE")}>
              <ListItemIcon> < AccountCircleRoundedIcon  /> </ListItemIcon>
              <ListItemText primary="profile" />
            </ListItem>        
        </List>
        <List>
            <ListItem button>
              <ListItemIcon> <SettingsRoundedIcon /> </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>        
        </List>
        <List>
            <ListItem button onClick={handleClickOpen}>
              <ListItemIcon> <ExitToAppRoundedIcon /> </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>        
        </List>
      </Drawer>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {onTabsChange()}
      </main>

      <Dialog
        open={open1}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">{"Sign Out ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to sign out from this website.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
           Cancel
          </Button>
          <Button onClick={()=>{
            firebase.auth().signOut().then({
            }).catch({

            })
          }} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
