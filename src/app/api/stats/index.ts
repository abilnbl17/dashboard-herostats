import { NextApiRequest, NextApiResponse } from "next";

const dummyStats = {
  totalUsers: 1250,
  monthlyRevenue: 75000,
  dailyVisitor: 3200,
  conversionRate: 2.5,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(dummyStats);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
