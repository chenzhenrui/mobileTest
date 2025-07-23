import fs from 'fs';
import path from 'path';

const getData = async () => {
  try {
    const filePath = path.join(__dirname, '../booking.json');
    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default { getData };
