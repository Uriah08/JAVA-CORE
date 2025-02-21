import { Skeleton } from "@/components/ui/skeleton";

interface OilAnalyses {
  analysis: string;
}

interface SelectedComponent {
  id: string;
  routeComponentID: string;
  name: string;
  oilAnalyses: OilAnalyses[];
}

interface SeverityHistoryProps {
  routeComponentsLoading: boolean;
  selectedComponent: SelectedComponent | null;
}

const OilAnalysis: React.FC<SeverityHistoryProps> = ({
  routeComponentsLoading,
  selectedComponent,
}) => {
  return (
    <div className="border rounded-lg flex overflow-auto">
      {Array.from({ length: 5 }).map((_, index) => {
        const oil = selectedComponent?.oilAnalyses[index] || null;

        return (
          <div key={index} className="flex flex-col border-r w-full">
            <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
              {index === 0 ? "Current" : "Previous"}
            </h1>
            <div className="flex justify-center items-center py-1">
              {routeComponentsLoading ? (
                <Skeleton className="w-5 h-5 animate-pulse bg-zinc-200" />
              ) : oil ? (
                <p className="w-5 object-cover">{oil.analysis}</p>
              ) : (
                <div className="w-5 h-5" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OilAnalysis;
