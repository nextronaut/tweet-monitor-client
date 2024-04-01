import { Anomaly } from './types';

export const filterAnomalies = (prev: Anomaly[], after: Anomaly[]): Anomaly[] => {
  return after.filter(afterAnomaly => !prev.some(prevAnomaly => prevAnomaly._id === afterAnomaly._id));
};

export const detectAnomalies = (anomalies: Anomaly[]): boolean => {
    const data: Anomaly[] = anomalies.filter(item => item.tweets > 40)
    if (data.length > 0) {
        return true;
    }
    return false
  };