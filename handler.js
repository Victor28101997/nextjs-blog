const baseHandler = require("./index.js");

export const onOriginEventReceived = async (event, context) => {
  try {
    const { request } = event.Records[0].cf;
    request.uri = "/serverside";
    return baseHandler.handler(event);
  } catch (error) {
    request.uri = "/serverside";
    return baseHandler.handler(event);
  }
};
