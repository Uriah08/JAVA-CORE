import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useGetAdminRouteComponentActionQuery } from "@/store/api";

interface ClientActionSectionProps {
  routeComponentsLoading: boolean;
  clientId?: string;
  componentId?: string;
}

const ClientActionSection: React.FC<ClientActionSectionProps> = ({
  routeComponentsLoading,
  clientId,
  componentId,
}) => {
  const { data, isLoading } = useGetAdminRouteComponentActionQuery(
    { componentId: componentId ?? "", clientId: clientId ?? "" },
    { skip: !componentId || !clientId }
  );

  const latestAction = data?.routeComponentAction?.[0] || null;
  const latestDate = latestAction
    ? new Date(latestAction.createdAt).toLocaleDateString()
    : "No date available";
  return (
    <div className="flex flex-col gap-3 mt-3 border border-main rounded-lg overflow-hidden">
      <h1 className="text-lg font-semibold bg-main text-white px-4 py-2">
        Client&apos;s Action and WO Number
      </h1>
      <div className=" p-3 flex flex-col h-full">
        <h1 className="font-semibold">WO Number</h1>
        {routeComponentsLoading || isLoading ? (
          <Skeleton
            className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
            style={{ animationDelay: `0.2s` }}
          />
        ) : (
          <Input
            readOnly
            placeholder="Client WO Number"
            className="mt-2 text-sm"
            value={latestAction?.woNumber || "No available WO Number"}
          />
        )}
        <div className="flex justify-between items-center mt-5">
          <h1 className="font-semibold">latest Action</h1>
          <h1 className="text-xs text-white bg-main px-3 py-1 rounded-md cursor-pointer hover:opacity-80 transition">
            {latestDate || "No Available date"}
          </h1>
        </div>
        {routeComponentsLoading || isLoading ? (
          <Skeleton
            className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
            style={{ animationDelay: `0.2s` }}
          />
        ) : (
          <div className="border rounded-lg p-3 mt-2 max-h-[130px] overflow-auto">
            <p className="text-sm text-zinc-600 indent-10">
              {latestAction?.action || "No action recorded."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientActionSection;
