const cron = require('node-cron');

cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
  const tenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 10));
  await JobPost.deleteMany({ 
    isDeleted: true, 
    deletedAt: { $lte: tenDaysAgo },
  });
});
