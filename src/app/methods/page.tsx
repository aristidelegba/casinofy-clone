import Image from "next/image";
export default function Methods() {
  return (
    <main className="flex flex-col items-start gap-5 pt-20">
      <div className="mt-10 font-semibold text-center w-3/5 mx-auto">
        Selectionnez une methode de paiement
      </div>
      <div className="mt-5 w-full mx-auto grid gap-2">
        <div className=" text-center w-3/5 mx-auto">
          Methodes disponibles
        </div>

        <div className=" w-full flex items-center justify-center gap-2">
          <Image
            src="/mtn.png"
            alt="mtn"
            className="rounded-lg"
            width={70}
            height={70}
          />
          <Image
            src="/moov.png"
            alt="moov"
            className="rounded-lg"
            width={70}
            height={70}
          />
        </div>
      </div>
    </main>
  );
}
