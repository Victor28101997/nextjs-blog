const baseHandler = require("./index.js");

export const onOriginEventReceived = async (event, context) => {
  const { request } = event.Records[0].cf;

  request.uri = "/serverside";
  return baseHandler.handler(event);
};
