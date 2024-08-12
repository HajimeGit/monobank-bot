module.exports = {
  apps: [
    {
      name: 'mono-app',
      script: 'app.js',
      node_args: '--env-file=.env --watch',
    },
  ],
};
