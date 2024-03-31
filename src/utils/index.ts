import { Anomaly } from "./types";

export const filterAnomalies = (prev: Anomaly[], after: Anomaly[]) : Anomaly[] => {
    return after.filter(item => !prev.includes(item));
}