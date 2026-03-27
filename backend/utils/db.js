import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const DB_FILE = path.join(process.cwd(), 'data', 'reports.json');

// Ensure DB directory and file exist
const initDB = async () => {
  try {
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify([]));
  }
};

export const getReports = async () => {
  await initDB();
  const data = await fs.readFile(DB_FILE, 'utf-8');
  return JSON.parse(data);
};

export const saveReports = async (reports) => {
  await fs.writeFile(DB_FILE, JSON.stringify(reports, null, 2));
};

export const createReport = async (domain, email) => {
  const reports = await getReports();
  const id = crypto.randomUUID();
  const newReport = {
    id,
    domain,
    email,
    clicks: 0,
    maxClicks: 3,
    createdAt: Date.now()
  };
  reports.push(newReport);
  await saveReports(reports);
  return id;
};

export const getAndIncrementReport = async (id) => {
  const reports = await getReports();
  const reportIndex = reports.findIndex(r => r.id === id);
  if (reportIndex === -1) return null;
  
  const report = reports[reportIndex];
  if (report.clicks >= report.maxClicks) {
    return { error: 'ACCESS_DENIED_EXPIRED' };
  }
  
  // Increment clicks
  reports[reportIndex].clicks += 1;
  await saveReports(reports);
  
  return reports[reportIndex];
};
