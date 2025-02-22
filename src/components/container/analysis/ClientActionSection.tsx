import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

interface SelectedComponent {
  id: string;
  routeComponentID: string;
  name: string;
  action?: string | null;
}

interface ClientActionSectionProps {
  routeComponentsLoading: boolean;
  selectedComponent: SelectedComponent | null;
}

const ClientActionSection: React.FC<ClientActionSectionProps> = ({
  routeComponentsLoading,
  selectedComponent,
}) => {
  return (
    <div className="flex flex-col gap-3 mt-3 border border-main rounded-lg overflow-hidden">
      <h1 className="text-lg font-semibold bg-main text-white px-4 py-2">
        Client&apos;s Action and WO Number
      </h1>
      <div className=" p-3 flex flex-col h-full">
        <h1 className="font-semibold">WO Number</h1>
        {routeComponentsLoading ? (
          <Skeleton
            className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
            style={{ animationDelay: `0.2s` }}
          />
        ) : (
          <Input
            readOnly
            placeholder="Client WO Number"
            className="mt-2 text-sm"
          />
        )}
        <h1 className="font-semibold mt-3">Client Action</h1>
        {routeComponentsLoading ? (
          <Skeleton
            className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
            style={{ animationDelay: `0.2s` }}
          />
        ) : (
          <div className="border rounded-lg p-3 mt-2 max-h-[130px] overflow-auto">
            <p className="text-sm text-zinc-600 indent-10">
              {selectedComponent?.action || "No action recorded."}
            </p>

            <h1 className="w-full text-end text-xs text-zinc-500 mt-2">
              Jan 1, 2025
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientActionSection;
