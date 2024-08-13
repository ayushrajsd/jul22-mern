import React from "react";
import TheatreList from "./TheatreList";
import { Tabs } from "antd";

function Partner() {
  const items = [{ key: "1", label: "Theatres", children: <TheatreList /> }];
  return (
    <div>
      <h1>Partner Page</h1>
      <Tabs items={items} />
    </div>
  );
}

export default Partner;
