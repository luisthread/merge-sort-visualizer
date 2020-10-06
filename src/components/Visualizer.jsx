import React, { Fragment, useState } from 'react';
import { Button, Grid, LinearProgress, makeStyles, Paper, TextField } from '@material-ui/core';
import { createArray } from '../utils';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const useStyles = makeStyles((theme) => ({
	grid: {
		padding: '1rem 0',
		margin: '1rem 0'
	},
	input: {
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	visual: {
		marginTop: '1rem',
		overflow: 'hidden'
	},
	button: {
		marginLeft: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	bar: {
		background: theme.palette.primary.main,
		borderRadius: '999rem 999rem 0 0',
		transition: 'all ease .1s'
	}
}));

const Visualizer = () => {
	const classes = useStyles();
	const [ size, setSize ] = useState(200);
	const [ array, setArray ] = useState(createArray(size));
	const [ velocity, setVelocity ] = useState(20);
	const [ isSorting, setIsSorting ] = useState(false);

	const sleep = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const merge = async (arr, a, b, c) => {
		let i = a,
			j = b + 1,
			p = 0;
		let tmp = [];
		while (i <= b && j <= c) {
			tmp[p++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
		}
		while (i <= b) {
			tmp[p++] = arr[i++];
		}
		while (j <= c) {
			tmp[p++] = arr[j++];
		}
		for (p = a; p <= c; p++) {
			arr[p] = tmp[p - a];
			setArray([ ...array, (array[p] = tmp[p - a]) ]);
			await sleep(velocity);
		}
	};

	const mergeSort = async (arr, a, b) => {
		if (a < b) {
			let m = a + ((b - a) >> 1);
			await mergeSort(arr, a, m);
			await mergeSort(arr, m + 1, b);
			await merge(arr, a, m, b);
		}
	};

	const handleSizeChange = (e) => {
		setSize(e.target.valueAsNumber);
		setArray(createArray(e.target.valueAsNumber));
	};
	const handleMergeSort = async () => {
		setIsSorting(true);
		let newArr = [ ...array ];
		await mergeSort(newArr, 0, newArr.length);
		setArray(newArr);
		setIsSorting(false);
	};
	return (
		<Fragment>
			<Paper className={classes.visual}>
				{isSorting && <LinearProgress />}
				<div
					style={{
						height: `20rem`,
						display: `flex`,
						alignItems: `flex-end`,
						margin: '1rem'
					}}
				>
					{array.map((item, id) => (
						<div
							key={id}
							className={classes.bar}
							style={{
								height: `calc(${item}/100 * 100%)`,
								width: `calc(100%/${array.length})`
							}}
						/>
					))}
				</div>
			</Paper>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="space-between"
				className={classes.grid}
			>
				<Grid container item xs={6}>
					<TextField
						className={classes.input}
						label="Items"
						type="number"
						id="items"
						value={size}
						onChange={handleSizeChange}
						variant="outlined"
						size="small"
						disabled={isSorting}
					/>
					<TextField
						className={classes.input}
						label="Velocity (ms)"
						type="number"
						id="velocity"
						value={velocity}
						onChange={(e) => setVelocity(e.target.valueAsNumber)}
						variant="outlined"
						size="small"
						disabled={isSorting}
					/>
				</Grid>
				<Grid container item xs={6} direction="row" justify="flex-end" alignItems="center">
					<Button
						className={classes.button}
						variant="contained"
						onClick={() => setArray(createArray(size))}
						startIcon={<AutorenewIcon />}
						disabled={isSorting}
					>
						Generate
					</Button>
					<Button
						className={classes.button}
						variant="contained"
						color="primary"
						onClick={handleMergeSort}
						disabled={isSorting}
					>
						{isSorting ? 'Sorting' : 'Merge sort'}
					</Button>
				</Grid>
			</Grid>
		</Fragment>
	);
};

export default Visualizer;
