import { Anomaly } from './types';

export const filterAnomalies = (prev: Anomaly[], after: Anomaly[]): Anomaly[] => {
  return after.filter(afterAnomaly => !prev.some(prevAnomaly => prevAnomaly._id === afterAnomaly._id));
};
