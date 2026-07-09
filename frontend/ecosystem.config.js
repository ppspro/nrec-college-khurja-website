module.exports = {
  apps: [
    {
      name: 'nrec-frontend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
