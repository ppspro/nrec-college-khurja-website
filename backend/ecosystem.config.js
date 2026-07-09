module.exports = {
  apps: [
    {
      name: 'nrec-backend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
