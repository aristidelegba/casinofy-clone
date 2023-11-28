import { useGlobalContext } from "@/contexts";
import { getRandomNumbers, shuffleArray } from "@/helpers/utils";
import { Alarm } from "@mui/icons-material";
import { Button } from "@mui/material";
import classNames from "classnames";
import { customAlphabet } from "nanoid";
import React, {
  ReactNode,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled, { keyframes } from "styled-components";
import Popup from "../Popup/Popup";
import Image from "next/image";
const cellHeight = 30;

const WheelPickerWrapper = styled.div`
  .inner {
    position: relative;
    overflow: hidden;
  }

  .inner::before,
  .inner::after {
    padding: 0;
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    background-color: green;
    width: 100%;
    height: 27px; /* Adjust the height of the blurred border */
    background: inherit;
    z-index: 9999;
  }

  .inner::before {
    top: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.3\8) 80%
    );
  }

  .inner::after {
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.3\8) 80%
    );
  }
`;

export type TWheelPickerRefMethods = {
  startAll: () => void;
  stopWheel: (id: number) => void;
  bootingCountDown: number;
};

const PopupTemplates = {
  leave: (stay: Function) => (
    <div className="w-full h-auto bg-white rounded-lg relative flex flex-col gap-10 py-6 justify-center items-center">
      <div className="font-bold mb-2 text-center">
        En quittant la partie, vous serez rembourse a 90%. Voir termes et
        conditions
      </div>
      <div className="flex items-center justify-center flex-wrap w-full px-5 gap-10">
        <Button
          onClick={() => {
            stay();
          }}
          className="capitalize "
          variant="contained"
          size="large"
        >
          Rester
        </Button>
        <Button
          onClick={() => {
            window.location.reload();
          }}
          className="capitalize "
          variant="contained"
          color="error"
          size="large"
        >
          Quitter
        </Button>
      </div>
    </div>
  ),
  failed: (
    <div className="w-full h-auto bg-white rounded-lg relative flex flex-col py-6 justify-center items-center">
      <div className="font-bold mb-2">Tu y etais presque!</div>
      <Button
        onClick={() => {
          window.location.reload();
        }}
        className="capitalize "
        variant="contained"
      >
        Reessayer
      </Button>
    </div>
  ),
  win: (gain: number) => (
    <div className="w-full h-[360px] bg-white rounded-lg relative flex flex-col py-6 justify-center items-center">
      <div className="z-10 text-center">
        <div className="font-bold text-14">Tu as gagné</div>
        <div className="text-20 font-bold my-2">{gain} FCFA</div>
      </div>
      <div
        style={{ bottom: "20px", left: "0" }}
        className="capitalize absolute z-10 w-full flex-center"
      >
        <Button
          onClick={() => {
            window.location.reload();
          }}
          variant="contained"
        >
          Continuez
        </Button>{" "}
      </div>

      <Image
        width={100}
        height={100}
        className="absolute w-full h-full object-cover z-0"
        src="/success-balloon.jpg"
        alt=""
      ></Image>
    </div>
  ),
};
type TWheelPickerProps = {
  wheelCount: number;
  speed: number;
  guestNumber: number;
  gains: number;
};
const WheelPicker = forwardRef<TWheelPickerRefMethods, TWheelPickerProps>(
  (props, ref) => {
    const { setIsSpinning } = useGlobalContext();
    const { wheelCount, guestNumber, speed = 1, gains } = props;
    const [bootingCountDown, setBootingCountDown] = useState<number>(3);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [popupBody, setPopupBody] = useState<ReactNode>(null);
    const [wheels, setWheels] = useState<
      { id: number; spin: boolean; result?: string | null }[]
    >([]);
    const [nextStoppableWheelId, setNextStoppableWheelId] = useState(0);

    // Expose methods or values to the parent component
    useImperativeHandle(
      ref,
      () => ({
        startAll,
        stopWheel,
        bootingCountDown,
      }),
      []
    ); // eslint-disable-line react-hooks/exhaustive-deps

    const startAll = () => {
      setWheels((prev) =>
        prev.map((e) => {
          return { ...e, spin: true };
        })
      );
      let countdown = bootingCountDown;
      const timer = setInterval(() => {
        if (countdown <= 0) {
          clearInterval(timer);
        } else {
          countdown -= 1;
          setBootingCountDown((prev) => countdown);
        }
      }, 1000);

      setIsSpinning(true);
    };

    const stopWheel = (id: number) => {
      setWheels((prev) =>
        prev.map((e) => {
          if (e.id === id) e.spin = false;
          return { ...e };
        })
      );
    };

    const onWheelStop = ({
      id,
      value,
    }: {
      id: number;
      value: string | null;
    }) => {
      if (!value) return;
      console.log(
        "value !== guestNumber.toString()[id]",
        value,
        guestNumber,
        guestNumber.toString()[id]
      );
      if (value !== guestNumber.toString()[id]) {
        setPopupBody(PopupTemplates.failed);
        setShowPopup(true);
      }
      setWheels((prev) =>
        prev.map((e) => {
          if (e.id === id) e.result = value;
          return { ...e };
        })
      );
    };

    const atLeastSomeWhellIsSpinning = () =>
      wheels.some((e) => e.spin === true);

    const wouldLeave = () => {
      setPopupBody(PopupTemplates.leave(() => setShowPopup(false)));
      setShowPopup(true);
    };

    const onGameOver = () => {
      setPopupBody(PopupTemplates.win(gains));
      setShowPopup(true);
    };

    useEffect(() => {
      setWheels(
        Array(wheelCount)
          .fill({})
          .map((e, i) => {
            return { id: i, spin: false };
          })
      );
      setBootingCountDown(3);
      setNextStoppableWheelId(0);
    }, [wheelCount]);

    return (
      <>
        <WheelPickerWrapper>
          <div className="my-4 flex-center flex-col">
            <Button
              disabled={
                !wheelCount || !guestNumber || guestNumber.toString().length < 2
              }
              onClick={bootingCountDown > 0 ? startAll : wouldLeave}
              variant="contained"
              className="px-10 py-3"
              color="error"
              disableElevation
            >
              {bootingCountDown > 0 ? (
                <> Faire touner les anneaux</>
              ) : (
                <>Quitter la partie</>
              )}
            </Button>{" "}
          </div>
          <div
            style={{
              height: cellHeight * 5,
            }}
            className=" inner w-full  items-center
    grid grid-flow-col justify-center gap-1
      overflow-hidden mt-10"
          >
            {wheels.map((e) => (
              <Wheel
                speed={speed}
                onStop={(value) => onWheelStop({ id: e.id, value })}
                key={e.id}
                spin={e.spin}
              />
            ))}
          </div>
        
          <div className="flex-center flex-col my-14">
            <Button
              disabled={!atLeastSomeWhellIsSpinning() || bootingCountDown > 0}
              onClick={() => {
                stopWheel(nextStoppableWheelId);
                setNextStoppableWheelId(nextStoppableWheelId + 1);
                if (nextStoppableWheelId + 1 === wheelCount) {
                  onGameOver();
                }
              }}
              variant="contained"
              className="px-10 py-3  flex gap-2"
              color="error"
              disableElevation
            >
              {atLeastSomeWhellIsSpinning() && bootingCountDown <= 0 ? (
                <>{`Arreter anneau ${nextStoppableWheelId + 1}`}</>
              ) : (
                <>
                  <Alarm /> {bootingCountDown}
                </>
              )}
            </Button>
          </div>
        </WheelPickerWrapper>

        <Popup show={showPopup}>{popupBody}</Popup>
      </>
    );
  }
);

// Define the animation using keyframes
const scrollAnimation = keyframes`
0% {
  transform: translateY(0);
}
100% {
  transform: translateY(-100%);
}
`;

const StyledWrapper = styled.div`
  .spin {
  }
  .wheel {
    animation: ${scrollAnimation} 2s linear infinite;
    animation-fill-mode: forwards;
    animation-play-state: paused;
  }
  .rootObserver {
    height: ${cellHeight}px;
    width: ${cellHeight}px;
    border-top: 1px solid blue;
    border-bottom: 1px solid blue;
    /* background-color: blue; */
    display: flex;
    align-items: start;
    justify-content: center;
    /* overflow: hidden; */
    position: relative;
    z-index: 10;
    flex-direction: column;
  }

  .cell {
    height: ${cellHeight}px;
    width: ${cellHeight}px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

type TWheelProps = {
  spin?: boolean;
  speed: number;
  onStop: (value: string | null) => void;
  // observerRootRef: RefObject<HTMLElement | null>;
};
function Wheel({ spin = false, speed, onStop }: TWheelProps) {
  const [numberSet] = useState<{ value: number }[]>(
    shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]).map((e) => ({
      value: e,
    }))
  );
  const wheelRef = useRef<HTMLElement | null>(null);
  const observerRootRef = useRef<HTMLElement | null>(null);
  const [focusedCell, setFocusedCell] = useState<string | null>(null);
  const [wasSpinning, setWasSpinning] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  useEffect(() => {
    if (spin) {
      setWasSpinning(true);
      setIsSpinning(true);
    } else {
      setIsSpinning(false);
      setTimeout(() => {
        setWasSpinning(false);
      }, 1000);
    }
  }, [spin]);

  const observerCallback = useCallback(
    (entries: any, observer: any) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          // console.log('wasSpinning, isSpinning', wasSpinning, isSpinning)
          /**
           * ! Determine if cell's span is fully visible in the root observer, with no contact with its border
           */
          const entryIsFullyVisible = entry.intersectionRatio === 1;
          if (wasSpinning && !isSpinning) {
            // console.log("entryIsFullyVisible", entryIsFullyVisible);
            // console.log("entry", entry.intersectionRatio);
            setFocusedCell(
              entryIsFullyVisible ? entry.target.textContent : null
            );
          }
        }
      });
    },
    [wasSpinning, isSpinning]
  );

  function observeSpinning() {
    const maxCloneNumber = 4;
    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0, 0.5, 1],
      root: observerRootRef?.current,
      rootMargin: "0px",
    });

    // Observe each cell
    const cells =
      observerRootRef?.current?.querySelectorAll(".cell span") || [];
    for (let index = 0; index < (cells || []).length; index++) {
      const element = cells[index];
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }

  useEffect(() => {
    observeSpinning();
  }, [wasSpinning, isSpinning]);

  useEffect(() => {
    onStop(focusedCell);
    console.log("fo", focusedCell);
  }, [focusedCell]);

  return (
    <StyledWrapper>
      <div
        className="rootObserver pt-[30px]"
        ref={(node) => {
          observerRootRef.current = node;
          if (observerRootRef) observerRootRef.current = node;
        }}
      >
        {[1, 2, 3].map((e) => (
          <div
            key={e}
            style={{
              animationDuration:  (numberSet.length/speed) + "s",
              animationPlayState: spin ? "running" : "paused",
            }}
            className={classNames("wheel spin")}
          >
            {
              // new Array(10)
              // .fill({})
              // .map((e, i) => ({ value: i }))
              numberSet.map(({ value }) => (
                <div
                  className="cell font-semibold"
                  key={value}
                  id={value + "-" + e}
                >
                  <span
                    // className="bg-gray-500 text-white "
                    style={{ lineHeight: "74%" }}
                  >
                    {value}
                  </span>
                 
                </div>
              ))
            }
          </div>
        ))}
      </div>
      {/* <p>{focusedCell}</p> */}
    </StyledWrapper>
  );
}

WheelPicker.displayName = "WheelPicker";

export default WheelPicker;
