import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createAddjob } from '../../database/jobs';
import { AddjobResponseBody } from './api/addjob';

export type AddjobResponseBody =
  | { errors: { message: string }[] }
  | { job: { company: string } }
  | { job: { title: string } }
  | { job: { type: string } }
  | { job: { location: string } }
  | { job: { salary: number } }
  | { job: { description: string } };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<AddjobResponseBody>,
) {
  if (request.method === 'POST') {
    // 1. make sure the data exist
    if (
      typeof request.body.company !== 'string' ||
      typeof request.body.title !== 'string' ||
      typeof request.body.type !== 'string' ||
      typeof request.body.location !== 'string' ||
      typeof request.body.salary !== 'string' ||
      typeof request.body.description !== 'string' ||
      !request.body.company ||
      !request.body.title ||
      !request.body.type ||
      !request.body.location ||
      !request.body.salary ||
      !request.body.description
    ) {
      return response.status(400).json({
        errors: [{ message: 'please fill out all the information above' }],
      });
    }
    console.log(request.body);

    // //2. Check if th euser already exist
    // const user = await getUserByUsername(request.body.username);

    // if (user) {
    //   return response
    //     .status(401)
    //     .json({ errors: [{ message: 'username is already taken' }] });
    // }

    // //3. We hash the password
    // const passwordHash = await bcrypt.hash(request.body.password, 12);

    const addjobToDatabase = await createAddjob(
      request.body.company,
      request.body.title,
      request.body.type,
      request.body.location,
      request.body.salary,
      request.body.description,
    );

    response.status(200).json({ job: { addjobToDatabase } });
  } else {
    response.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
