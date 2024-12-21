const path = require('path');

module.exports = {
	apps: [
		{
			name: 'erado-front-end',
			script: 'npm run start',  // Assuming corrected package.json script
			cwd: path.join(__dirname, 'apps/web'), // Change to your web app directory
			// watch: [
			// 	'src',  // Example, adjust as needed
			// 	'public',
			// ],
			out_file: "./front-end-out.log",
			error_file: "./front-end-error.log",
			log_date_format: "DD-MM HH:mm:ss Z",
			env: {
				NODE_ENV: 'development',
				PORT: 4000
			},
			env_production: {
				NODE_ENV: 'production',
				PORT: 4000
			},
		},
		{
			name: 'erado-back-end',
			script: 'npm run start',  // Use the package.json start script
			// watch: [
			// 	'src', // Watch your source code for changes
			// ],
			cwd: path.join(__dirname, 'apps/server'), // Change to your server app directory
			out_file: "./back-end-out.log",
			error_file: "./back-end-error.log",
			log_date_format: "DD-MM HH:mm:ss Z",
			env: {
				NODE_ENV: 'development',
				PORT: 4001
			},
			env_production: {
				NODE_ENV: 'production',
				PORT: 4001
			},
		}
	],
};