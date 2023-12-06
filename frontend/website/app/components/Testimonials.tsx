import Image from "next/image";

export const Testimonials = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#fff] p-[20px] md:p-[48px] lg:p-[72px]">
      <div className="text-center text-[#222] text-[24px] font-extrabold mb-[36px] px-[20%]">
        What Petloers Said about Us
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-[20px]">
        {Array.apply(null, Array(3)).map((testimonial, index) => {
          return (
            <div key={index} className="bg-[#fff] h-[700px] w-[100%] relative">
              <Image
                src={`/testimonial_${index + 1}.webp`}
                alt="Petloer Testimonial"
                objectFit="cover"
                layout="fill"
                className="rounded-[16px]"
              />
            </div>
          );
        })}

        <div className="bg-[#EBE3D5] rounded-[16px] h-[700px] w-[100%] flex items-center justify-center">
          <div className="text-[#222] font-bold text-[20px] w-[65%] text-center">
            Download The App and Be The Next Petloer!
          </div>
        </div>
      </div>
    </div>
  );
};
