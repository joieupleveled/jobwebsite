// This only simulates a database
// DO NOT COPY THIS FILE FOR THE PROJECT
// Use PostgreSQL-similar to this database

import { sql } from './connect';

// Define the structure of wood object so we can use it
export type Job = {
  id: number;
  company: string;
  title: string;
  type: string;
  salary: number;
  description: string;
};

// Calling/Getting all the jobs
export async function getJobs() {
  const jobs = await sql<Job[]>`
  SELECT
    *
  FROM
    jobs;
`;

  return jobs;
}

// How to get the information of a specific/single wood by ID?
export async function getJobById(id: number) {
  // Pluck something from array without using index(Destructure the array[wood])
  const [job] = await sql<Job[]>`
    SELECT
      *
    FROM
      jobs
    WHERE
      id = ${id}
  `;
  return job;
}
// Now, we are getting this data from the database

// export const jobs = [
//   {
// id: 1,
// company: 'ABC',
// title: 'Web Developer',
// type: 'full-time',
// location: 'Vienna',
// salary: 40000,
// description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Etiam erat velit scelerisque in dictum non. Pellentesque massa placerat duis ultricies lacus. At tempor commodo ullamcorper a lacus vestibulum sed arcu non. Purus semper eget duis at. Et ligula ullamcorper malesuada proin libero. Varius sit amet mattis vulputate enim nulla. Nunc sed id semper risus in hendrerit gravida. A diam sollicitudin tempor id.

// Aliquam ultrices sagittis orci a scelerisque purus semper eget duis. Tempor id eu nisl nunc mi ipsum faucibus. Cum sociis natoque penatibus et magnis dis parturient.Hendrerit gravida rutrum quisque non tellus orci ac auctor augue. Vulputate dignissim suspendisse in est. Quam quisque id diam vel quam elementum pulvinar etiam. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada. '
//   },
//   {
//     id: 2,
//     name: 'Softwood',
//     src: 'softwood',
//     Type: 'Cedar, Pine, and Juniper',
//     Description: 'Kiln dried and officially ready to burn',
//     Price: 200,
//   },
//   {
//     id: 3,
//     name: 'Hardwood',
//     src: 'hardwood',
//     Type: 'Birch, Cherry,  and Walnut',
//     Description: 'Perfect for a long slow burn with maximum heat output',
//     Price: 300,
//   },
//   {
//     id: 4,
//     name: 'Pellets',
//     src: 'pellets',
//     Type: 'Hardwood and softwood',
//     Description:
//       'Highly flammable, burn extremely efficiently and produce very little ash',
//     Price: 300,
//   },
//   {
//     id: 5,
//     name: 'Pellets',
//     src: 'pellets',
//     Type: 'Hardwood and softwood',
//     Description:
//       'Highly flammable, burn extremely efficiently and produce very little ash',
//     Price: 300,
//   },
// ];
