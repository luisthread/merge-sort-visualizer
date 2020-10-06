import React from 'react';
import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

const Navbar = () => {
	const classes = useStyles();
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton
					edge="start"
					className={classes.menuButton}
					color="inherit"
					aria-label="menu"
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					Merge Sort
				</Typography>

				<IconButton
					color="inherit"
					aria-label="luisthread"
					href="https://github.com/luisthread"
				>
					<GitHubIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
