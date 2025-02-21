import { Skeleton } from "@/components/ui/skeleton";

interface Temperature {
  temperature: number;
}

interface SelectedComponent {
  id: string;
  routeComponentID: string;
  name: string;
  temperatures: Temperature[];
}

interface SeverityHistoryProps {
  routeComponentsLoading: boolean;
  selectedComponent: SelectedComponent | null;
}

const TemperatureSection: React.FC<SeverityHistoryProps> = ({
  routeComponentsLoading,
  selectedComponent,
}) => {
  return (
    <div className="border rounded-lg flex overflow-auto">
      {Array.from({ length: 5 }).map((_, index) => {
        const temp = selectedComponent?.temperatures[index] || null;

        return (
          <div key={index} className="flex flex-col border-r w-full">
            <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
              {index === 0 ? "Current" : "Previous"}
            </h1>
            <div className="flex justify-center items-center py-1">
              {routeComponentsLoading ? (
                <Skeleton className="w-5 h-5 animate-pulse bg-zinc-200" />
              ) : temp ? (
                <p className="w-5 object-cover">{temp.temperature}</p>
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

export default TemperatureSection;
