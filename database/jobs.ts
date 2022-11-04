import { sql } from './connect';

// Define the structure of wood object so we can use it
export type Wood = {
  id: number;
  name: string;
  type: string;
  description: string | null;
  price: number;
};

// Calling/Getting all the woods
export async function getWoods() {
  const woods = await sql<Wood[]>`
  SELECT
    *
  FROM
    woods;
`;

  return woods;
}

// How to get the information of a specific/single wood by ID?
export async function getWoodById(id: number) {
  // Pluck something from array without using index(Destructure the array[wood])
  const [wood] = await sql<[Wood]>`
    SELECT
      *
    FROM
      woods
    WHERE
      id = ${id}
  `;
  return wood;
}
