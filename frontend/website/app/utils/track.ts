import { cookies } from "next/headers";
import { headers } from "next/headers";

type event = "pageView";
const eventPath: { [key in event]: string } = {
  pageView: "/api/tracking/page-view",
};

const origin =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://petlo.co";

export const track = (event: event) => {
  const cookieStore = cookies();
  const headersList = headers();

  fetch(`${origin}${eventPath[event]}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fbp: cookieStore.get("_fbp")?.value,
      fbc: cookieStore.get("_fbc")?.value,
      userAgent: headersList.get("user-agent"),
    }),
  });
};
