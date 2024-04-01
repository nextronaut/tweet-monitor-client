import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnomaliesByPlatform } from "../../../services/anomaly";
import { detectAnomalies, filterAnomalies } from "../../../utils";
import { Anomaly } from "../../../utils/types";
import AreaChart from "../../../components/charts/AreaChart";
import AnomalyTable from "../../../components/table/AnomalyTable";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = process.env.REACT_APP_API_URL;

const AnomalyList = () => {
  const { platform } = useParams();
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [detectAnomaly, setDetectAnomaly] = useState<boolean>(false);

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
      `${apiUrl}/anomalies/sse/${platform}`
    );
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const filteredData = filterAnomalies(anomalies, data.anomalies);
      const detect:boolean = detectAnomalies(filteredData)
      setDetectAnomaly(detect)
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

  useEffect(() => {
    if(detectAnomaly) {
      toast("New Anomaly Detected!")
    }
  }, [detectAnomaly])

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
      <ToastContainer />
    </div>
  );
};

export default AnomalyList;
