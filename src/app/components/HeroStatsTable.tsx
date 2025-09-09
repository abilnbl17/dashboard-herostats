import { HeroStats } from "@/types/dota";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@heroui/react";

interface HeroStatsTableProps {
  data: HeroStats[];
}
const HeroStatsTable = ({ data }: HeroStatsTableProps) => {
  if (!data || data.length === 0) {
    return <div>Tidak ada statistik hero untuk ditampilkan.</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Hero</TableCell>
            <TableCell>Atribut Utama</TableCell>
            <TableCell>Win Rate Pro</TableCell>
            <TableCell>Pick Rate Pro</TableCell>
            <TableCell>Tier</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((hero) => (
            <TableRow key={hero.id}>
              <TableCell>{hero.localized_name}</TableCell>
              <TableCell>{hero.primary_attr.toUpperCase()}</TableCell>
              <TableCell>
                {hero.pro_win_rate_percentage?.toFixed(2) || "N/A"}%
              </TableCell>
              <TableCell>
                {hero.pro_pick_rate_percentage?.toFixed(2) || "N/A"}%
              </TableCell>
              <TableCell>{hero.calculated_tier || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default HeroStatsTable;
