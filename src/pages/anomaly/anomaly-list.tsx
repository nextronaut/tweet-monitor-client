import { useEffect, useState } from "react";
import { getAnomaliesByPlatform } from "../../services/anomaly";
import { filterAnomalies } from "../../utils";
import { Anomaly } from "../../utils/types";
import AreaChart from "../../components/charts/AreaChart";

const AnomalyList = () => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  useEffect(() => {

    getAnomaliesByPlatform("twitter").then((res:any)=>{
        setAnomalies(res.data)
    })

    const eventSource = new EventSource(
      "http://localhost:3001/api/anomalies/sse/twitter"
    );
    eventSource.onmessage = (event) => {
      const data= JSON.parse(event.data);
      setAnomalies(filterAnomalies(anomalies, data.anomalies));
    };
    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <h1>AnomalyList</h1>
      <p>{anomalies.length}</p>
      <AreaChart data={anomalies} width={500} height={300}></AreaChart>
    </>
  );
};

export default AnomalyList;
