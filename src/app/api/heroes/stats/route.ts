import { NextResponse } from "next/server";

const dummyStats = {
  totalUsers: 10000,
  monthlyRevenue: 75000,
  dailyVisitors: 32000,
  conversionRate: 2.5,
};

export async function GET() {
  return NextResponse.json(dummyStats);
}
