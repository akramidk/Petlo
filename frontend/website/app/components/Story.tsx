import Image from "next/image";

export const Story = ({ t, lang }: { t: any; lang: "en" | "ar" }) => {
  return (
    <div className="bg-[#f9f9f9] p-[20px] md:p-[48px] lg:p-[72px] flex flex-col items-center justify-center space-y-[20px]">
      <div className="h-[400px] w-[400px] relative">
        <Image
          src={`/eloi.webp`}
          alt="Eloi"
          fill
          className="rounded-[16px] object-cover"
        />
      </div>

      <div className="text-center">
        <div className="font-extrabold text-[20px] leading-[36px] sm:text-[24px] sm:leading-[40px] text-[#222]">
          Eloi, The Reason Behind Petlo
        </div>

        <div className="font-medium text-[14px] leading-[26px] sm:text-[15.5px] sm:leading-[28px] text-[#777]">
          So yeah, this Eloi. She&apos;s the whole story for creating Petlo. One
          day when we were me
        </div>
      </div>
    </div>
  );
};
