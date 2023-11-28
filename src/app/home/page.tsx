"use client";
import CustomSelect from "@/components/Forms/CustomSelect";
import DemoRealSwitch from "@/components/common/DemoRealSwitch/DemoRealSwitch";
import WheelPicker, {
  TWheelPickerRefMethods,
} from "@/components/common/WheelPicker/WheelPicker";
import {
  TMise,
  TNumbersCount,
  TWheelSpeed,
  misesOptions,
  numbersCountOptions,
  wheelSpeedOptions,
} from "@/configs";
import { useGlobalContext } from "@/contexts";
import { calculateTotalGain } from "@/helpers/utils";
import { Button, Input, TextField } from "@mui/material";
import { customAlphabet } from "nanoid";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const wheelPickerRef = useRef<TWheelPickerRefMethods>(null);
  const [userInputs, setUserInputs] = useState<TUserInputs>({
    mise: { value: 0, title: "title" },
    numbersCount: { value: 2, percent: 0, title: "title" },
    wheelSpeed: { value: 0, percent: 0, title: "title" },
  });

  function onUserInputsChange(e: TUserInputs) {
    setUserInputs(e);
  }

  function isUserInputsValid(): boolean {
    return userInputs.guestNumber != null && userInputs.guestNumber > 0;
  }
  return (
    <main className="flex flex-col gap-5 lg:p-24 p-3">
      <div className="flex items-center justify-center w-full mt-20 text-14">
        <DemoRealSwitch />
      </div>

      <UserInputsForm onChange={onUserInputsChange} />

      <div className="my-5 flex-col flex-center gap-10">
        <WheelPicker
          gains={userInputs.gains || 0}
          speed={userInputs.wheelSpeed.value || 0}
          guestNumber={userInputs.guestNumber || 0}
          wheelCount={userInputs.numbersCount.value || 2}
          ref={wheelPickerRef}
        />
      </div>
    </main>
  );
}

// User Input components
type TUserInputs = {
  mise: TMise;
  numbersCount: TNumbersCount;
  wheelSpeed: TWheelSpeed;
  guestNumber?: number;
  gains?: number;
};
function UserInputsForm({
  onChange = () => {},
}: {
  onChange: (data: TUserInputs) => void;
}) {
  const { isSpinning } = useGlobalContext();
  const [form, setForm] = useState<TUserInputs>({
    mise: misesOptions[0],
    numbersCount: numbersCountOptions[0],
    wheelSpeed: wheelSpeedOptions[0],
  });

  const [guestNumber, setGuestNumber] = useState<number | undefined>();

  function onFormChange(data: {
    field: "mise" | "numbersCount" | "wheelSpeed";
    value: any;
  }) {
    const { field, value } = data;
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  useEffect(() => {
    onChange({ ...form, guestNumber, gains: parseFloat(gains()) });
  }, [form, guestNumber]);

  function gains() {
    console.log("form", form);
    return calculateTotalGain({
      mise: form.mise,
      numbersCount: form.numbersCount,
      wheelSpeed: form.wheelSpeed,
    });
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <label htmlFor="font-medium mb-5">Mise: </label>
        <CustomSelect
          disabled={isSpinning}
          options={misesOptions}
          onChange={(e) => {
            onFormChange({
              field: "mise",
              value: misesOptions.find((opt) => opt.value === e?.target?.value),
            });
          }}
          value={form.mise.value}
          label="Mise"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="font-medium mb-5">Nombre de chiffres:</label>
        <CustomSelect
          disabled={isSpinning}
          options={numbersCountOptions}
          onChange={(e) => {
            onFormChange({
              field: "numbersCount",
              value: numbersCountOptions.find(
                (opt) => opt.value === e?.target?.value
              ),
            });
          }}
          value={form.numbersCount.value}
          label="Mise"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="font-medium mb-5">Vitesse des anneaux:</label>
        <CustomSelect
          disabled={isSpinning}
          options={wheelSpeedOptions}
          onChange={(e) => {
            onFormChange({
              field: "wheelSpeed",
              value: wheelSpeedOptions.find(
                (opt) => opt.value === e?.target?.value
              ),
            });
          }}
          value={form.wheelSpeed.value}
          label="Mise"
        />
      </div>

      <div className="mt-25 flex items-end">
        <div className="font-medium">Gains:</div>
        <div className="font-bold ml-8">{gains()} FCFA</div>
      </div>

      <GuestNumberForm
        length={form.numbersCount.value}
        onChange={(e: number) => setGuestNumber(e)}
      />
    </div>
  );
}

// GuestNumber Form
type TGuestNumberFormProps = { length: number; onChange: Function };
function GuestNumberForm({
  length = 2,
  onChange = () => {},
}: TGuestNumberFormProps) {
  const { isSpinning } = useGlobalContext();
  const [value, setValue] = useState<string>("");
  function onValueChange(e: ChangeEvent<HTMLInputElement>) {
    const eventValue = e?.target?.value;
    const isNumericValue = !isNaN(parseInt(eventValue)); // html input can accept 'e' char even thoug the input type is numeric, this is to prevent this behavior
    if (eventValue.length <= length && isNumericValue) {
      setValue(eventValue);
    } else {
      e.preventDefault();
    }
  }

  useEffect(() => {
    onChange(parseInt(value));
  }, [value]);

  useEffect(() => {
    setValue("");
  }, [length]);

  function generateRandomValuet() {
    const nanoid = customAlphabet("1234567890", length);
    const randomInt = nanoid();
    setValue(randomInt);
  }
  return (
    <>
      <div className="flex-center flex-col gap-5">
        {/* <Input */}
        <TextField
          type="number"
          inputMode="numeric"
          disabled={isSpinning}
          value={value}
          onChange={onValueChange}
          title="Entrer un nombre"
          className="w-full"
          // variant="outlined"
        />
        <div>ou</div>
        <Button
          disabled={isSpinning}
          onClick={generateRandomValuet}
          variant="contained"
          className="px-10 py-3"
          color="primary"
          disableElevation
        >
          Generer un nombre{" "}
        </Button>
      </div>

      <div className="mt-5 text-3xl font-extrabold flex justify-center">
        {value || "NOMBRE"}
      </div>
    </>
  );
}
