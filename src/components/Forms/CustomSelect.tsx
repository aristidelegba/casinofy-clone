"use client";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import classNames from "classnames";
import { useEffect } from "react";

export default function CustomSelect(
  props: { options: { title: string; value: any, [key: string]: any }[] } & SelectProps
) {
  const { options, onChange, value, renderValue, label, ...rest } = props;

  useEffect(() => {
    console.log('value', value)
  }, [value])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <Select
        {...rest}
          sx={{
            height: 40,
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: "1px solid" },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: "1px solid black",
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: "1px solid black",
            },
          }}
          value={value}
          className="border-none outline-none"
          label={label}
          onChange={onChange}
          displayEmpty
          notched={false}
          // renderValue={(value: any) => (renderValue ? renderValue(value) : value)}
          MenuProps={{
            classes: {
              // root: "relative",
              // paper: "shadow-sm absolute h-[100px] w=[100px] "
            },
            anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"

            // getContentAnchorEl: null
          },

          }}
          
          autoWidth
        >
          {options.map((item, index) => (
            <MenuItem
              key={item.title}
              classes={{
                root: classNames(
                  "flex justify-start items-center h-2 text-14 ",
                  index % 2 === 0 ? "bg-gray-200" : "bg-white"
                ),
              }}
              value={item.value}
            >
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
