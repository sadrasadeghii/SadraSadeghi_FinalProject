import React from 'react'
import { AppBar, Badge, Grid, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material'
import { midLinks, rightLinks } from '../models/navLinks';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from '@mui/icons-material';
import { useStoreContext } from '../../context/StoreContext'
interface IProps {
    darkMode: boolean;
    changeDarkMode: () => void;
}
const useStyles = makeStyles(theme => ({
    list: {
        display: "flex",
        alignItems: 'center',
        width: "100%"
    },
    listItem: {
        color: 'inherit'
    },
    iconButton: {
        color: "inherit"
    }
})
)
const styles = {
    "&:hover": {
        color: "grey.500",
    },
    "&.active": {
        color: "grey.400"
    }
}
const Header: React.FC<IProps> = ({ darkMode, changeDarkMode }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { basket } = useStoreContext()
    const itemCounts = basket?.items.reduce((sum, item) => sum += item.quantity, 0)
    return (
        <AppBar position='static'>
            <Toolbar>
                <Grid container>
                    <Grid item xs={4} md={1} display={"flex"} alignItems={"center"}>
                        <Typography component={NavLink} to={"/"} sx={{
                            color: "inherit", textDecoration: "none", "&.active": {
                                color: 'error.light'
                            }
                        }}>
                            بیگ استور
                        </Typography>
                        <Switch checked={darkMode} onChange={changeDarkMode} />
                    </Grid>
                    <Grid item xs={8} md={9.5} display="flex" alignItems="center" justifyContent="start">
                        <List className={classes.list}>
                            {midLinks.map(({ title, path }, index) => (
                                <ListItem key={index} component={NavLink}
                                    to={path}
                                    className={classes.listItem}
                                    sx={{ width: 'auto', ...styles }}

                                >
                                    {title}
                                </ListItem>))}
                        </List>
                    </Grid>
                    <Grid item xs={12} md display="flex" alignItems="center" justifyContent="end">
                        <IconButton size='large' className={classes.iconButton} sx={{ color: "inherit" }}
                            onClick={() => navigate('/basket')}>
                            <Badge badgeContent={itemCounts} color='secondary' >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        <List className={classes.list}>
                            {rightLinks.map(({ title, path }, index) => (
                                <ListItem key={index} component={NavLink}
                                    to={path}
                                    className={classes.listItem}
                                    sx={{ width: 'auto', ...styles }}
                                >
                                    {title}
                                </ListItem>))}
                        </List>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar >
    )
}

export default Header
