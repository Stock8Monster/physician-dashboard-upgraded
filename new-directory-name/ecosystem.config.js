// ecosystem.config.js
module.exports = {
    apps: [
        {
            name: 'react-app',
            script: 'serve',
            args: ['-s', 'build', '-l', '9000'],
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
