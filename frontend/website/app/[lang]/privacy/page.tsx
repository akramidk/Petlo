import ReactMarkdown from "react-markdown";

const Privacy = () => {
  return (
    <div className="bg-[#fff] p-[28px] md:p-[72px] lg:p-[0px] lg:flex lg:justify-center">
      <div className="lg:w-[592px] lg:py-[72px] space-y-[32px]">
        {CONTENT.map((value, index) => {
          return (
            <div key={index}>
              <div className="font-extrabold text-[24px] text-[#222] mb-[8px]">
                {value.title}
              </div>

              <ReactMarkdown className="font-normal text-[#666] leading-8">
                {value.description}
              </ReactMarkdown>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CONTENT = [
  {
    title: "Privacy",
    description:
      "Al Khalili LTD built the Petlo app as a Free app. This SERVICE is provided by Al Khalili LTD at no cost and is intended for use as is. This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service. If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy. The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Petlo unless otherwise defined in this Privacy Policy.",
  },
  {
    title: "Information Collection and Use",
    description:
      "For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to name, phone number, location, and card number. The information that we request will be retained by us and used as described in this privacy policy. The app does use third-party services that may collect information used to identify you.",
  },
  {
    title: "Log Data",
    description:
      "We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.",
  },
  {
    title: "Cookies",
    description:
      'Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device\'s internal memory. This Service does not use these "cookies" explicitly. However, the app may use third-party code and libraries that use "cookies" to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.',
  },
  {
    title: "Service Providers",
    description:
      "We may employ third-party companies and individuals due to the following reasons: \n\n * To facilitate our Service \n\n * To provide the Service on our behalf \n\n * To assist us in analyzing how our Service is used. \n\n We want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.",
  },
  {
    title: "Security",
    description:
      "We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.",
  },
  {
    title: "Changes to This Privacy Policy",
    description:
      "We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. This policy is effective as of 20-09-2023",
  },
  {
    title: "Contact Us",
    description:
      "If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at support@petlo.co.",
  },
];

export default Privacy;
