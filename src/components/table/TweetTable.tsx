import React, { useEffect, useState } from 'react';
import { Tweet } from '../../utils/types';
import Tag from '../custom/Tag';

interface TweetTableProps {
    data: Tweet[];
}

const TweetTable: React.FC<TweetTableProps>  = ({ data }) => {

  const [tableData, setTableData] = useState<Tweet[]>([])

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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map(tweet => (
            <tr key={tweet._id}>
              <td className="px-6 py-4 whitespace-nowrap">{tweet.platform}</td>
              <td className="px-6 py-4">{tweet.content}</td>
              <td className="px-6 py-4 whitespace-nowrap"><Tag tags={tweet.hashtags}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TweetTable;
