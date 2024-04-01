import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnomaliesByPlatform } from "../../../services/anomaly";
import { filterAnomalies } from "../../../utils";
import { Anomaly } from "../../../utils/types";
import AreaChart from "../../../components/charts/AreaChart";
import AnomalyTable from "../../../components/table/AnomalyTable";

const AnomalyList = () => {
  const { platform } = useParams();
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);

  useEffect(() => {
    if (!platform) {
      return;
    }
    if(anomalies.length === 0) {
      getAnomaliesByPlatform(platform).then((res: any) => {
        setAnomalies(res.data);
      });
    }

    const eventSource = new EventSource(
      `http://localhost:3001/api/anomalies/sse/${platform}`
    );
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const filteredData = filterAnomalies(anomalies, data.anomalies);
      const newData = [...anomalies, ...filteredData]
      setAnomalies(newData);
    };
    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [platform, anomalies]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Anomaly List : {platform}</h1>
      <p className="text-lg mb-4">Total Anomalies: {anomalies.length}</p>
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-16">
        <AreaChart data={anomalies} height={300} />
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-16">
        <AnomalyTable data={anomalies} />
      </div>
    </div>
  );
};

export default AnomalyList;