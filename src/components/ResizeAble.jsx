import React, { useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";

const ReactGridLayout = WidthProvider(RGL);

const ResizableDivs = () => {
  const divData = [
    { title: "Section 1", content: "Resizable Content" },
    { title: "Section 2", content: "Resizable Content" },
    { title: "Section 3", content: "Resizable Content" },
  ];

  const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];

  const [layout, setLayout] = useState([
    { i: "0", x: 0, y: 0, w: 6, h: 31, resizeHandles: availableHandles },
    { i: "1", x: 6, y: 0, w: 6, h: 31, resizeHandles: availableHandles },
    { i: "2", x: 0, y: 1, w: 12, h: 31, resizeHandles: availableHandles },

  ]);
  const handleLayoutChange = (updatedLayout) => {
    updatedLayout.forEach((updatedItem, index) => {
      const prevItem = layout[index];
      if (
        updatedItem.h !== prevItem.h ||
        updatedItem.w !== prevItem.w ||
        updatedItem.x !== prevItem.x ||
        updatedItem.y !== prevItem.y
      ) {
        if (updatedItem.i === "1") {
          updatedLayout[index - 1].h = updatedItem.h;
        }
        // If key 0 is updated, assign its height to key 1
        if (updatedItem.i === "0") {
          updatedLayout[index + 1].h = updatedItem.h;
        }
      }
    });
    setLayout(updatedLayout);
  };

  let handleClick = (e) => {
    console.log(e);
  }

  const checkLayout = (updatedLayout) => {
    console.log("rrrr", updatedLayout);
  };

  return (
    <ReactGridLayout
      layout={layout}
      onLayoutChange={handleLayoutChange}
      onDropDragOver={checkLayout}
      cols={12}
      rowHeight={1}
      maxH={20}
      draggableHandle=".handle"
      className="resizable-box-container"
    >
      <div key="0" className="resizable-box"  onClick={e => handleClick(e.key)}>
        <div className="handle">Section 1</div>
        <div className="content">Resizable Content</div>
      </div>
      <div key="1" id="1" className="resizable-box"  onClick={e => handleClick(e.key)}>
        <div className="handle">Section 2</div>
        <div className="content">Resizable Content</div>
      </div>
      <div key="2" className="resizable-box"  onClick={e => handleClick(e.key)}>
        <div className="handle">Section 3</div>
        <div className="content">Resizable Content</div>
      </div>
    </ReactGridLayout>
  );
};

export default ResizableDivs;
