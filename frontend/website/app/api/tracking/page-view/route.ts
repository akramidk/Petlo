export async function POST(request: Request) {
  const body = await request.json();

  const bizSdk = require("facebook-nodejs-business-sdk");
  const EventRequest = bizSdk.EventRequest;
  const UserData = bizSdk.UserData;
  const ServerEvent = bizSdk.ServerEvent;

  const access_token =
    "EAAEvISMYn6wBOZB956aUjg58T4CIIujaQQKJCdPOqCKqb4gyaqeALx3jmkRvkl1mz6MQM4TfChHtsMw97bTfHbMXHZAkmZCmOyJTNZBSLYEoslkrQzCi5FSPwRLSgqxKcCEiT54iX200AJsoooc73PvU5fkhPAS8nE8NCAXWcMcaCHMiBPG3xs7BaU9BUcJHPQZDZD";
  const pixel_id = "3633054593643576";
  bizSdk.FacebookAdsApi.init(access_token);

  let current_timestamp = Math.floor(Date.now() / 1000);

  const userData = new UserData().setClientUserAgent(body.userAgent);
  if (body.fbp) userData.setFbp(body.fbp);
  if (body.fbc) userData.setFbc(body.fbc);

  const serverEvent = new ServerEvent()
    .setEventName("PageView")
    .setEventTime(current_timestamp)
    .setUserData(userData)
    .setEventSourceUrl(body.url)
    .setActionSource("website");

  const eventsData = [serverEvent];
  const eventRequest = new EventRequest(access_token, pixel_id).setEvents(
    eventsData
  );

  eventRequest.execute();

  return new Response(undefined, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "petlo.co",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
