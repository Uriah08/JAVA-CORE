"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import Recommendations from "../dialogs/Recommendations";
import { Dispatch, SetStateAction } from "react";

interface Recommendation {
  priority: string;
  recommendation: string;
  createdAt: Date;
}

interface SelectedComponent {
  id: string;
  routeComponentID: string;
  name: string;
  recommendations: Recommendation[];
}

interface RecommendationsSectionProps {
  routeComponentsLoading: boolean;
  selectedComponent: SelectedComponent | null;
  openRecommendation: boolean;
  setOpenRecommendation: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}

const RecommendationSection: React.FC<RecommendationsSectionProps> = ({
  routeComponentsLoading,
  selectedComponent,
  openRecommendation,
  setOpenRecommendation,
  refetch,
}) => {
  return (
    <div className="flex flex-col gap-3 mt-3 border border-main rounded-lg overflow-hidden">
      <h1 className="text-lg font-semibold bg-main text-white px-4 py-2">
        Recommendation
      </h1>
      <div className="w-full p-3 flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="font-medium">Current Recommendation</h1>
            <div className="p-3 border rounded-lg">
              {routeComponentsLoading ? (
                <Skeleton className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md" />
              ) : selectedComponent &&
                selectedComponent.recommendations.length > 0 ? (
                (() => {
                  const sortedRecommendations = [
                    ...selectedComponent.recommendations,
                  ].sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  );
                  const latestRecommendation = sortedRecommendations[0];

                  return latestRecommendation ? (
                    <>
                      <div className="flex justify-between items-center">
                        <h1 className="font-bold">
                          {latestRecommendation.priority}
                        </h1>
                        <h1 className="text-xs text-zinc-500">
                          {new Date(
                            latestRecommendation.createdAt
                          ).toLocaleDateString()}
                        </h1>
                      </div>
                      <p className="text-sm text-zinc-700 mt-3">
                        {latestRecommendation.recommendation}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-zinc-400">
                      No recommendations available.
                    </p>
                  );
                })()
              ) : (
                <p className="text-sm text-zinc-400">
                  No recommendations available.
                </p>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <h1 className="font-medium">Previous Recommendation</h1>
            <div className="p-3 border rounded-lg">
              {routeComponentsLoading ? (
                <Skeleton className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md" />
              ) : selectedComponent &&
                selectedComponent.recommendations.length > 0 ? (
                (() => {
                  const sortedRecommendations = [
                    ...selectedComponent.recommendations,
                  ].sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  );
                  const previousRecommendation =
                    sortedRecommendations[1] || null;

                  return previousRecommendation ? (
                    <>
                      <div className="flex justify-between items-center">
                        <h1 className="font-bold">
                          {previousRecommendation.priority}
                        </h1>
                        <h1 className="text-xs text-zinc-500">
                          {new Date(
                            previousRecommendation.createdAt
                          ).toLocaleDateString()}
                        </h1>
                      </div>
                      <p className="text-sm text-zinc-700 mt-3">
                        {previousRecommendation.recommendation}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-zinc-400">
                      No previous recommendation.
                    </p>
                  );
                })()
              ) : (
                <p className="text-sm text-zinc-400">
                  No previous recommendation.
                </p>
              )}
            </div>
          </div>
        </div>

        <Dialog open={openRecommendation} onOpenChange={setOpenRecommendation}>
          <Button
            onClick={() => setOpenRecommendation(!openRecommendation)}
            type="button"
            className="w-full font-normal text-sm justify-start cursor-text"
            variant={"outline"}
          >
            Write a recommendation...
          </Button>
          {openRecommendation && (
            <Recommendations
              routeComponentId={selectedComponent?.routeComponentID}
              onClose={() => setOpenRecommendation(false)}
              refetch={refetch}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default RecommendationSection;
