import Image from "next/image";

export const HowItWorks = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#f9f9f9] p-[20px] md:p-[48px] lg:p-[72px]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">
        {STEPS.map((step, index) => {
          return (
            <div
              key={index}
              className="#fff bg-[#fff] rounded-[16px] relative text-center p-[52px] space-y-[36px]"
            >
              <div className="h-[600px] relative">
                <Image
                  src={`/${lang}_autoship_${index + 1}.webp`}
                  alt="Petloer Testimonial"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              <div className="bg-[#fff] font-medium text-[15.5px] leading-[28px] text-[#777] px-[12px]">
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const STEPS = [
  "After downloading & opening the app, go to the 'Autoship' tab, and click 'Create an Autoship'.",
  "Fill in the Autoship information. name, items, delivery address, payment method, for whom this Autoship from your pets to make it unique and to get some surprises for the included pets 😉, and then add when the Autoship should arrive.",
  "On the page 'When should it arrive?', you need to set when the first shipment should arrive. Then you need to set when should it recur.",
  "Before creation, you can check all the Autoship information like when should it arrive and the amount. When you're done you can click the 'Create' button.",
  "Now on the Autoship page, you will see all the Autoships that you have, or you can create new ones.",
  "When clicking on the 3 dots icon on any Autoship you have, you can always change anything from there, skip the next shipment, or deactivate the Autoship.",
];
