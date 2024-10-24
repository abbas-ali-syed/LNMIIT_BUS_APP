import cron from 'node-cron';
import Comment from './models/commentModel.js';
import Day from './models/busModel.js';

// Cron job se comments clear   
const clearComments = async () => {
  try {
    await Comment.deleteMany({});
    console.log('All comments have been cleared');
  } catch (error) {
    console.error('Error clearing comments:', error);
  }
};

// Bus ka count reset
const resetBusCounts = async () => {
  try {
    const days = await Day.find({});
    for (let day of days) {
      day.buses.forEach(bus => {
        bus.count = 0;
      });
      await day.save();
    }
    console.log('All bus counts have been reset');
  } catch (error) {
    console.error('Error resetting bus counts:', error);
  }
};
export const runCleanupTasks = async () => {
    console.log('Running cleanup tasks...');
    await clearComments();
    await resetBusCounts();
    console.log('Cleanup tasks completed');
  };

// Schedule the cron job to run every day at midnight
cron.schedule('0 0 * * *', runCleanupTasks);

export const initCronJobs = () => {
  console.log('Cron jobs initialized');
};
