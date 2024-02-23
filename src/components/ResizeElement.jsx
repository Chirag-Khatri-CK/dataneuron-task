import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const ResizableElement = () => {
  const [height1, setHeight1] = useState(window.innerHeight / 4);
  const [height2, setHeight2] = useState(window.innerHeight / 4);
  const [height3, setHeight3] = useState(window.innerHeight / 2);

  const handleResize1 = (event, { element, size }) => {
    setHeight1(size.height);
    setHeight3(window.innerHeight - size.height - height2);
  };

  const handleResize2 = (event, { element, size }) => {
    setHeight2(size.height);
    setHeight3(window.innerHeight - size.height - height1);
  };

  return (
    <div className="p-10 bg-fuchsia-400" id="parent">
      <h3 className="text-fuchsia-800 text-2xl text-center font-semibold mb-8">
        Task 1
      </h3>
      <div
        className="gap-4"
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div className="gap-4 flex flex-1">
          <ResizableBox
            className=" grow rounded-lg overflow-hidden"
            width={window.innerWidth / 2}
            height={height1}
            onResize={handleResize1}
            resizeHandles={["s", "e", "w"]}
            minConstraints={[100, 100]}
          >
            <div className="w-full h-full bg-fuchsia-300 text-2xl font-semibold flex items-center justify-center">
              Section 1
            </div>
          </ResizableBox>
          <ResizableBox
            className=" grow rounded-lg overflow-hidden"
            width={window.innerWidth / 2}
            height={height1}
            onResize={handleResize2}
            resizeHandles={["s", "e", "w"]}
            minConstraints={[100, 100]}
          >
            <div className="w-full h-full bg-fuchsia-300 text-2xl font-semibold flex items-center justify-center">
              Section 2
            </div>
          </ResizableBox>
        </div>
        <ResizableBox
          width={window.innerWidth}
          height={height3}
          resizeHandles={["n", "e", "w"]}
          minConstraints={[100, 100]}
          style={{ flexGrow: 1 }}
          className="max-w-full rounded-lg overflow-hidden"
        >
          <div className="w-full h-full bg-fuchsia-300 text-2xl font-semibold flex items-center justify-center">
            Section 3
          </div>
        </ResizableBox>
      </div>
    </div>
  );
};

export default ResizableElement;
