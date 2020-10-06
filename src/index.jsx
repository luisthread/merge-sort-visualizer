import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import App from './App';

ReactDOM.render(
	<StrictMode>
		<CssBaseline />
		<App />
	</StrictMode>,
	document.getElementById('root')
);
