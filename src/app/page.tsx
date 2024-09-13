import { Overview } from "@/components/BarChart";
import PageTitle from "@/components/PageTitle";
import { CardContent } from "@/components/card";
import { DataTableDemo } from "@/components/review-table/dataTable";
import { SentimenChart } from "@/components/sentimenChart";
export default async function Home() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dashboard" />

      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-3 min-h-full">
        <CardContent className="lg:col-span-1 p-4 h-auto">
          <p className="font-semibold">Overview</p>
          <Overview />
        </CardContent>

        <CardContent className="lg:col-span-2 p-4 h-auto">
          <p className="font-semibold">Sentiment</p>
          <SentimenChart />
        </CardContent>
      </section>
      <DataTableDemo />
    </div>
  );
}
