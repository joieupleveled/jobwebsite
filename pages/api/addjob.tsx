import crypto from 'node:crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { createAddjob, getJobById } from '../../database/jobs';
import { createSession } from '../../database/sessions';
import { createSerializedRegisterSessionTokenCookie } from '../../utils/cookies';
import { createCsrfSecret } from '../../utils/csrf';

// import { createSession } from '../../database/sessions';
// import { createSerializedRegisterSessionTokenCookie } from '../../utils/cookies';
// import { createCsrfSecret } from '../../utils/csrf';

export type AddjobResponseBody = { errors: { message: string }[] } | any;
// | {
//     // job: {
//       id: number;
//       company: string;
//       title: string;
//       type: string;
//       location: string;
//       salary: number;
//       description: string;
//     // };
//   };
// | { job: { title: string } }
// | { job: { type: string } }
// | { job: { location: string } }
// | { job: { salary: number } }
// | { job: { description: string } };

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

    // 2. Check if th job already exist
    const job = await getJobById(request.body.job);

    if (job) {
      return response.status(401).json({
        errors: [{ message: 'job is already posted' }],
      });
    }

    // 4. sql query to create the record
    const addjobToDatabase = await createAddjob(
      request.body.company,
      request.body.title,
      request.body.type,
      request.body.location,
      request.body.salary,
      request.body.description,
    );

    // 5. create a csrf secret
    const secret = await createCsrfSecret();

    // 6.Create a session token and serialize a cookie with the token
    const session = await createSession(
      Number(addjobToDatabase?.id),
      crypto.randomBytes(80).toString('base64'),
      secret,
    );

    const serializedCookie = createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    response
      .status(200)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ addjobToDatabase });
  } else {
    response.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
