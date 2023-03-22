import { useState, useEffect } from 'react';
import { corvaDataAPI, socketClient } from '@corva/ui/clients';
import { reverse } from 'lodash';

interface WITSSummaryData {
  timestamp: number;
  data: {
    hole_depth: number;
    state: string;
  };
}

interface FetchWITSSummaryDataParams {
  assetId: string;
  dataset: string;
}

interface UseWITSSummaryDataParams {
  assetId: string;
  dataset: string;
}

async function fetchWITSSummaryData({ assetId, dataset }: FetchWITSSummaryDataParams): Promise<WITSSummaryData[]> {
  try {
    return await corvaDataAPI.get(`/api/v1/data/corva/${dataset}/`, {
      limit: 1000,
      skip: 0,
      sort: JSON.stringify({ timestamp: -1 }),
      query: JSON.stringify({ asset_id: assetId }),
      fields: ['timestamp', 'data.hole_depth', 'data.state'].join(','),
    });
  } catch (e) {
    console.log(e);
    return [];
  }
}

function useWITSSummaryData({ assetId, dataset }: UseWITSSummaryDataParams) {
  const [witsSummaryData, setWITSSummaryData] = useState<WITSSummaryData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unsubscribe;
    setLoading(true);

    fetchWITSSummaryData({ assetId, dataset })
      .then(response => {
        setWITSSummaryData(reverse(response));

        const subscription = { provider: 'corva', dataset, assetId };
        const onDataReceive = (event: any) => setWITSSummaryData(prevData => prevData.concat(event.data));

        unsubscribe = socketClient.subscribe(subscription, { onDataReceive });
      })
      .finally(() => setLoading(false));

    return () => unsubscribe?.();
  }, [assetId, dataset]);

  return { loading, witsSummaryData };
}

export default useWITSSummaryData;
