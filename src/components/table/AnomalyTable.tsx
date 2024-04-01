import React, { useEffect, useState } from 'react';
import { Anomaly } from '../../utils/types';

interface AnomalyProps {
    data: Anomaly[];
}

const AnomalyTable: React.FC<AnomalyProps>  = ({ data }) => {
  const [tableData, setTableData] = useState<Anomaly[]>([])

  useEffect(() => {
    if(data) {
        setTableData(data)
    }
  }, [data])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tweets</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map(anomaly => (
            <tr key={anomaly._id}>
              <td className="px-6 py-4 whitespace-nowrap">{anomaly.platform}</td>
              <td className="px-6 py-4 whitespace-nowrap">{anomaly.startId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{anomaly.endId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{anomaly.tweets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnomalyTable;
