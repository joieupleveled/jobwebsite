// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Code below is a sample, please edit accordingly:

import { Request, Response } from 'express';
import { API_URL } from '../../lib/api';

export default async (_: Request, res: Response) => {
  try {
    const data = await fetch(`${API_URL}.json`);
    const json = await data.json();
    res.status(200).json(json);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
