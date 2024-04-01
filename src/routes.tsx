import { createBrowserRouter } from "react-router-dom";
import AnomalyDetail from "./pages/anomaly/anomaly-detail";
import AnomalyList from "./pages/anomaly/platform/anomaly-list";
import TweetDetail from "./pages/tweet/tweet-detail";
import TweetList from "./pages/tweet/tweet-list";
import App from "./App";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/tweet",
    element: <TweetList />,
  },
  {
    path: "/tweet/:id",
    element: <TweetDetail />,
  },
  {
    path: "/anomaly/platform/:platform",
    element: <AnomalyList />,
  },
  {
    path: "/anomaly/:id",
    element: <AnomalyDetail />,
  },
]);

export default routes;
