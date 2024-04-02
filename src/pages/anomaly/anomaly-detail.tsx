import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Anomaly, Tweet } from "../../utils/types";
import { getAnomaly } from "../../services/anomaly";
import TweetTable from "../../components/table/TweetTable";

const AnomalyDetail = () => {
  const { id } = useParams();
  const [anomaly, setAnomaly] = useState<Anomaly>();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  useEffect(() => {
    if (id) {
      getAnomaly(id)
        .then((res: any) => {
          setAnomaly(res.data.anomaly);
          setTweets(res.data.tweets);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);
  return (
    <>
      <div className="container mx-auto py-8">
        <div className="px-16">
          <h1 className="text-3xl font-bold mb-4">Anomaly Detail</h1>
          <p className="text-lg mb-4">Anomaly Platform: {anomaly?.platform}</p>
          <p className="text-lg mb-4">Anomaly Tweets: {anomaly?.tweets}</p>
          <p className="text-lg mb-4">
            Anomaly Windows Shift Time: {anomaly?.shiftTimeAverage}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-16">
          <TweetTable data={tweets} />
        </div>
      </div>
    </>
  );
};

export default AnomalyDetail;
