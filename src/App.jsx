import { Container } from '@material-ui/core';
import React from 'react';
import Navbar from './components/Navbar';
import Visualizer from './components/Visualizer';

const App = () => {
	return (
		<div>
			<Navbar />
			<Container fixed>
				<Visualizer />
			</Container>
		</div>
	);
};

export default App;
