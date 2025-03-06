import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useGetAdminRouteComponentAnalystNoteQuery } from "@/store/api";

interface AnalystNoteSectionProps {
  isLoading: boolean;
  clientId?: string;
  componentId?: string;
}

const AnalystNoteSection: React.FC<AnalystNoteSectionProps> = ({
  isLoading,
  clientId,
  componentId,
}) => {
  const { data, isLoading: queryLoading } = useGetAdminRouteComponentAnalystNoteQuery(
    { componentId: componentId ?? "", clientId: clientId ?? "" },
    { skip: !componentId || !clientId }
  );

  console.log("data: ", data);

  const latestNote = data?.routeComponentNote?.[0] || null;
  const latestDate = latestNote
    ? new Date(latestNote.createdAt).toLocaleDateString()
    : "No date available";

    const showLoading = isLoading || queryLoading;

  return (
    <div className="flex flex-col gap-3 mt-3 border border-main rounded-lg overflow-hidden">
      <h1 className="text-lg font-semibold bg-main text-white px-4 py-2">
        Analyst Note
      </h1>
      <div className="p-3 flex flex-col h-full">
        <h1 className="font-semibold">Analyst Name</h1>
        {showLoading ? (
          <Skeleton
            className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
            style={{ animationDelay: `0.2s` }}
          />
        ) : (
          <Input
            readOnly
            placeholder="Analyst Name"
            className="mt-2 text-sm"
            value={latestNote?.analyst || "No available analyst"}
          />
        )}
        <div className="flex justify-between items-center mt-5">
          <h1 className="font-semibold">Latest Note</h1>
          <h1 className="text-xs text-white bg-main px-3 py-1 rounded-md cursor-pointer hover:opacity-80 transition">
            {latestDate || "No Available date"}
          </h1>
        </div>
        {showLoading ? (
          <Skeleton
            className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
            style={{ animationDelay: `0.2s` }}
          />
        ) : (
          <div className="border rounded-lg p-3 mt-2 max-h-[165px] overflow-auto">
            <p className="text-sm text-zinc-600 indent-10">
              {latestNote?.note || "No note recorded."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalystNoteSection;
