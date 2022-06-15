import React, { useEffect } from 'react';
import { withWebChat } from '@ibm-watson/assistant-web-chat-react';

const myLocation = ({ location, createWebChatInstance }) => {

  useEffect(() => {
    function onWebChatLoad(instance) {
      instance.render();
    }
    const webChatOptions = {
      integrationID: "3498e0c3-b5d1-4a48-9a8a-f0c49d84b629", // The ID of this integration.
      region: "au-syd", // The region your integration is hosted in.
      serviceInstanceID: "138ceade-4631-45cc-9a1c-eb08b7fce215", // The ID of your service instance.
      onLoad: onWebChatLoad
    };

    createWebChatInstance(webChatOptions);
  }, []);

};

export default withWebChat()(myLocation);