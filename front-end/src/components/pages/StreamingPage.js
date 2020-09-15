import React from "react";
import {Helmet} from 'react-helmet-async'
import StreamingService from "../streaming/StreamingService";

const StreamingPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Streaming</title>
      </Helmet>
      <StreamingService />
    </React.Fragment>
  );
};

export default StreamingPage;
