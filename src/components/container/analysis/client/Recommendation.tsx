"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetClienttRouteComponentRecommendationQuery } from "@/store/api";

interface RecommendationProps {
  isLoading: boolean;
  selectedComponent: {
    routeComponent?: {
      id: string;
    }[];
  } | null;
}

const Recommendation: React.FC<RecommendationProps> = ({
  isLoading,
  selectedComponent,
}) => {
  const routeComponentIds = React.useMemo(
    () => selectedComponent?.routeComponent?.map((rc) => rc.id) ?? [],
    [selectedComponent]
  );

  const shouldRefetch = React.useRef(true);

  React.useEffect(() => {
    shouldRefetch.current = true;
  }, [routeComponentIds]);

  const { data: routeComponentRecommendation, isFetching: queryLoading } =
    useGetClienttRouteComponentRecommendationQuery(routeComponentIds, {
      skip: !routeComponentIds || routeComponentIds.length === 0,
      refetchOnMountOrArgChange: shouldRefetch.current,
    }) ?? { routeComponentComments: [] };

  const showLoading = isLoading || queryLoading;

  React.useEffect(() => {
    shouldRefetch.current = false;
  }, [routeComponentRecommendation]);

  const recommendations =
    routeComponentIds.length === 0
      ? [] // Reset if no routeComponentIds
      : routeComponentRecommendation?.routeComponentRecommendation.flatMap(
          (rcr) => rcr.recommendations
        ) || [];

  const sortedRecommendation = [...recommendations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const latestRecommendation = sortedRecommendation[0] || null;
  const previousRecommendation = sortedRecommendation[1] || null;

  return (
    <div className="flex flex-col gap-3 mt-3 border border-main rounded-lg overflow-hidden">
      <h1 className="text-lg font-semibold bg-main text-white px-4 py-2">
        Recommendation
      </h1>
      <div className="w-full p-3 flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Current Recommendation */}
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="font-medium">Current Recommendation</h1>
            <div className="p-3 border rounded-lg">
              {showLoading ? (
                <Skeleton className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md" />
              ) : latestRecommendation ? (
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
              )}
            </div>
          </div>

          {/* Previous Recommendation */}
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="font-medium">Previous Recommendation</h1>
            <div className="p-3 border rounded-lg">
              {showLoading ? (
                <Skeleton className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md" />
              ) : previousRecommendation ? (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
