import React, { ReactNode } from "react";

function Popup({ children, show }: { children: ReactNode; show: boolean }) {
  const backdrop = (
    <div className="h-screen w-screen z-10 bg-black opacity-75 absolute top-0 left-0"></div>
  );
  return (
    <>
      {show ? (
        <div className="h-screen w-screen fixed top-0 left-0 z-[1000000000]">
          {backdrop}
          <div className="absolute z-30 h-full w-full flex-center px-6">
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Popup;
