import Image from "next/image";

export default function Hero() {
  return (
    <section>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black text-white">
        <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight">
          Upcycled Fashion Show
        </h1>
        <Image
          src="/image/sun-umbrellas-112401_1920.jpg"
          alt="Hero Image"
          width={1920}
          height={1080}
          className="mt-8 rounded-lg shadow-lg max-w-full h-auto"
        ></Image>
      </div>
    </section>
  );
}
