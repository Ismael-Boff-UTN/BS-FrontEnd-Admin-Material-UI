import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import FastfoodIcon from "@material-ui/icons/Fastfood";
//Material UI
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeIcon from "@material-ui/icons/Home";
import ExtensionOutlinedIcon from "@material-ui/icons/ExtensionOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MergeTypeOutlinedIcon from "@material-ui/icons/MergeTypeOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
//
import { useSelector, useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
import { Link as RouterLink, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  mainTitle: {
    fontFamily: "Dancing Script",
    fontSize: "30px",
  },

  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const { nombre, apellido, img} = useSelector((state) => state.auth.resto);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <AccountCircleOutlinedIcon />
        &nbsp;&nbsp;Perfil
      </MenuItem>

      <MenuItem onClick={handleLogout}>
        <ExitToAppIcon />
        &nbsp;&nbsp;Cerrar Sesión
      </MenuItem>
    </Menu>
  );

  //Vista Desde Movil
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Typography className={classes.avatarName} variant="h5">
            {nombre + " " + apellido}
          </Typography>
          &nbsp;&nbsp;
          <Avatar alt="Remy Sharp" src={img} className={classes.large} />
          &nbsp;&nbsp;
          <KeyboardArrowDownIcon />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="absolute" style={{ background: "#2E3B55" }}>
        <Toolbar>
          <Avatar
            alt="Remy Sharp"
            src="assets/images/bs_admin.png"
            className={classes.large}
          />
          <Typography className={classes.mainTitle} variant="h6" noWrap>
            &nbsp;&nbsp;{"El Buen Sabor </>"}
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="start"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt="Remy Sharp" src={img} className={classes.large} />
              &nbsp;&nbsp;
              {nombre}
              &nbsp;&nbsp;
              <KeyboardArrowDownIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        <Paper elevation={0} >
          <Tabs
            value={
              history.location.pathname !== "/"
                ? history.location.pathname
                : false
            }
            //onChange={handleChange}
            variant="scrollable"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="icon label tabs example"
          >
            <Tab
              icon={<HomeIcon />}
              label="Home"
              component={RouterLink}
              to="/home"
              value="/home"
            />
            <Tab
              icon={<ExtensionOutlinedIcon />}
              label="Ingredientes"
              component={RouterLink}
              to="/ingredientes-list"
              value="/ingredientes-list"
            />
            <Tab
              icon={<FastfoodIcon />}
              label="Productos"
              component={RouterLink}
              to="/products-list"
              value="/products-list"
            />
            <Tab
              icon={<AccountCircleOutlinedIcon />}
              label="Usuarios"
              component={RouterLink}
              to="/usuarios-list"
              value="/usuarios-list"
            />
            <Tab
              icon={<MergeTypeOutlinedIcon />}
              label="Categorias"
              component={RouterLink}
              to="/categorias-list"
              value="/categorias-list"
            />
            <Tab
              icon={<VpnKeyOutlinedIcon />}
              label="Roles"
              component={RouterLink}
              to="/roles-list"
              value="/roles-list"
            />
            <Tab
              icon={<FastfoodIcon />}
              label="Caja Admision"
              component={RouterLink}
              to="/caja-adm-list"
              value="/caja-adm-list"
            />
            <Tab
              icon={<FastfoodIcon />}
              label="Cocinero"
              component={RouterLink}
              to="/cocinero-list"
              value="/cocinero-list"
            />
            <Tab
              icon={<FastfoodIcon />}
              label="Caja Facturacion"
              component={RouterLink}
              to="/caja-fact-list"
              value="/caja-fact-list"
            />
            <Tab
              icon={<FastfoodIcon/>}
              label="Delivery"
              component={RouterLink}
              to="/delivery-list"
              value="/delivery-list"
            />
          </Tabs>
        </Paper>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
