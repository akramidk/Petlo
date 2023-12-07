import Image from "next/image";

export const HowItWorks = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#f9f9f9] p-[20px] md:p-[48px] lg:p-[72px]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">
        {Array.apply(null, Array(5)).map((step, index) => {
          return (
            <div
              key={index}
              className="#fff bg-[#fff] rounded-[16px] relative text-center p-[52px] space-y-[36px]"
            >
              <div className="h-[600px] relative">
                <Image
                  src={`/ar_autoship_1.webp`}
                  alt="Petloer Testimonial"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              <div className="bg-[#fff] font-medium text-[15.5px] leading-[28px] text-[#777] px-[12px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const STEPS = [];
