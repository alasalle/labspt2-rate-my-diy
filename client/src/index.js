import React from 'react';
import ReactDOM from 'react-dom';
import './styles/_globals.scss';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';

const client = new ApolloClient({
	uri: 'https://stark-meadow-13883.herokuapp.com/'
});

ReactDOM.render(
	<Router>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</Router>,
	document.getElementById('root'),
);
