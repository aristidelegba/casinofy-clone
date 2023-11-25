export default function History() {
  return (
    <main className="flex flex-col items-start gap-5 pt-20">
      <div className="mt-10 font-semibold text-center w-3/5 mx-auto">
        Historique{" "}
      </div>
      <div className="mt-5 w-full px-10 grid gap-5">
        {[1, 1, 1, 1, 1, 1, 1, , 1].map((e, i) => {
          const isOdd = i % 2 === 1;
          return (
            <div className="flex items-center justify-between" key={e}>
              <div className="font-bold">
                {isOdd ? (
                  <>
                    <span className="text-red-500">Perdu</span>
                  </>
                ) : (
                  <>
                    <span className="text-blue-500">Gagne</span>
                  </>
                )}
              </div>
              <div>
                1250 FCFA
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
