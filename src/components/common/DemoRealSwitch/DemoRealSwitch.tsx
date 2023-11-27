"use client";

import classNames from "classnames";
import React, { useState } from "react";
type TSwitchItem={

    id: string
    label: string
    selected: boolean
  
}
function DemoRealSwitch() {
  const [items, setItems] = useState<TSwitchItem[]>([
    {
      id: "demo",
      label: "Demo",
      selected: true,
    },
    {
      id: "reel",
      label: "Reel",
      selected: false,
    },
  ]);

  function onClickOnSwith(id: string) {
    setItems(prev=>prev.map(item=>{
      return {...item, selected: item.id === id}
    }))
  }
  const activeClassName = `text-blue-900 bg-white rounded-full`;
  const defaultClassName = `text-white`;
  return (
    <div className="bg-blue-900 h-12 flex items-center rounded-full px-3 font-semibold">
      {items.map((item) => {
        return (
            <div
            key={item.id}
              onClick={()=>onClickOnSwith(item.id)}
              className={classNames(
                "h-8 flex justify-center items-center px-3 ",
                { [defaultClassName]: !item.selected },
                { [activeClassName]: item.selected }
              )}
            >
              <span>{item.label}</span>
            </div>
        );
      })}
    </div>
  );
}

export default DemoRealSwitch;
