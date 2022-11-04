export const API_URL = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'job-listings.p.rapidapi.com/?limit=2',
  },
};

export interface IndeedJob {
  id: string;
  type: string;
  job_position: string;
  company: string;
  salary: number;
  location: string;
  title: string;
  description: string;
}
