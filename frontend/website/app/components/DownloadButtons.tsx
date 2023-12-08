import clsx from "clsx";
import { headers } from "next/headers";
import { DownloadButton } from "./DownloadButton";

export const DownloadButtons = ({
  t,
  lang,
  borderColor,
  ignoreFlex,
}: {
  t: any;
  lang: "en" | "ar";
  borderColor: string;
  ignoreFlex?: boolean;
}) => {
  const headersList = headers();
  const userAgent = headersList.get("user-agent");
  const isAndroid = userAgent?.includes("Android");
  const isiPhone = userAgent?.includes("iPhone");
  const downloadButtons: ("android" | "ios")[] = isAndroid
    ? ["android"]
    : isiPhone
    ? ["ios"]
    : ["ios", "android"];

  return (
    <div className="inline-block">
      <div
        className={clsx("space-y-[4px]", {
          ["md:space-y-[0px] md:flex"]: !ignoreFlex,
        })}
      >
        {downloadButtons.map((os, index) => {
          return (
            <div
              key={index}
              className={clsx({
                ["md:mr-[4px]"]:
                  index + 1 !== downloadButtons.length && lang === "en",
                ["md:ml-[4px]"]:
                  index + 1 !== downloadButtons.length && lang === "ar",
              })}
            >
              <DownloadButton
                type={os}
                lang={lang}
                firstText={t[`HOME.DOWNLOAD.${os.toUpperCase()}_FIRST_TEXT`]}
                secondText={t[`HOME.DOWNLOAD.${os.toUpperCase()}_SECOND_TEXT`]}
                borderColor={borderColor}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
