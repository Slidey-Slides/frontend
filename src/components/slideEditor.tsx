"use client";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Circle, IText, Rect, FabricImage } from "fabric";
import { RxText } from "react-icons/rx";
import { LuShapes } from "react-icons/lu";
import { CgShapeCircle, CgShapeSquare } from "react-icons/cg";
import { IoMdColorFill } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { FaImages } from "react-icons/fa";

import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "../app/globals.css";

export const SlideEditor = ({
  defaultSlideData,
}: {
  defaultSlideData: any;
}) => {
  const { editor, onReady } = useFabricJSEditor();
  const [canvasState, setCanvasState] = useState([]);
  const [color, setColor] = useState("#aabbcc");

  const [showFillColorPicker, setShowFillColorPicker] = useState(false);
  const [showStrokeColorPicker, setShowStrokeColorPicker] = useState(false);
  const [showShapes, setShowShapes] = useState(false);

  useEffect(() => {
    editor?.canvas
      .loadFromJSON(defaultSlideData[0])
      .then((canvas) => canvas.requestRenderAll());
  }, [editor?.canvas, defaultSlideData]);

  const onAddCircle = () => {
    const circle = new Circle({
      radius: 50,
      stroke: "#373937",
      strokeWidth: 2,
      left: 100,
      top: 50,
    });

    editor?.canvas.add(circle);
  };
  const onAddRectangle = () => {
    const rectangle = new Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      stroke: "#373937", // Border color of the rectangle
      strokeWidth: 2, // Border thickness
    });

    // Add the rectangle to the canvas
    editor?.canvas.add(rectangle);
  };
  const onAddText = () => {
    const tb = new IText("Enter a Text", {
      fontFamily: "Helvetica",
      top: 100,
      left: 100,
      borderColor: "#373937",
      fill: "white",
    });

    editor?.canvas.add(tb);
  };
  const onAddImage = async () => {
    const image = await FabricImage.fromURL("rick.jpeg");
    editor?.canvas.add(image);
    console.log("asscock");
  };
  const onDelete = () => {
    editor?.deleteSelected();
  };
  const onSetFillColor = () => {
    editor?.setFillColor(color);
  };
  const onSetStrokeColor = () => {
    editor?.setStrokeColor(color);
  };
  const onSetBackgroundColor = () => {
    editor?.canvas.set("backgroundColor", color);
    editor?.canvas.requestRenderAll();
  };

  const onExport = () => {
    alert("Work has been saved");
    setCanvasState(editor?.canvas.toJSON());
    console.log(JSON.stringify(editor?.canvas.toJSON()));
  };
  const onImport = () => {
    editor?.canvas.loadFromJSON(canvasState).then((canvas) => canvas.requestRenderAll());
  };
  const onDebug = () => {
    console.log(canvasState);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Backspace" || event.key === "Delete") {
        console.log("hi");

        onDelete();
      } else if (event.altKey && event.key === "ß") {
        // When Alt + s is clickend
        alert("Work has been saved");
        // onExport();
      } else if (event.key === "Escape") {
        if (showFillColorPicker) setShowFillColorPicker(!showFillColorPicker);
        else if (showStrokeColorPicker) setShowStrokeColorPicker(!showStrokeColorPicker);
        else if (showShapes) setShowShapes(!showShapes);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onDelete]);

  return (
    <div className="w-full h-full bg-black">
      <header className="h-[15vh] flex flex-col justify-around items-start p-5">
        <div>Slides name placeholder</div>
        <div className="flex items-baseline">
          <div className="relative">
            <LuShapes
              size={50}
              className="p-2 rounded-t-sm "
              style={{
                backgroundColor: showShapes ? "#6a7282" : "transparent",
              }}
              onClick={() => {
                if (showStrokeColorPicker) setShowStrokeColorPicker(!showStrokeColorPicker);
                if (showFillColorPicker) setShowFillColorPicker(!showFillColorPicker);
                setShowShapes(!showShapes);
              }}
            />
            {showShapes ? (
              <div className="flex flex-col left-0  absolute z-20 bg-[#795ddd] rounded-sm p-2 rounded-tl-none ">
                <div className="flex w-32 ">
                  <CgShapeCircle
                    size={40}
                    onClick={() => {
                      onAddCircle();
                      setShowShapes(false);
                    }}
                  />
                </div>
                <div className="flex w-32 ">
                  <CgShapeSquare
                    size={40}
                    onClick={() => {
                      onAddRectangle();
                      setShowShapes(false);
                    }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <RxText className="p-2" onClick={onAddText} size={50} />
          <div className="relative">
            <IoMdColorFill
              size={50}
              className="p-2 rounded-t-sm"
              style={{
                backgroundColor: showFillColorPicker ? "#6a7282" : "transparent",
              }}
              onClick={() => {
                if (showStrokeColorPicker) setShowStrokeColorPicker(!showStrokeColorPicker);
                if (showShapes) {
                  setShowShapes(!showShapes);
                }
                setShowFillColorPicker(!showFillColorPicker);
              }}
            />
            {showFillColorPicker ? (
              <div className="flex flex-col left-0  absolute z-20 bg-[#795ddd] rounded-sm p-2 rounded-tl-none">
                <HexColorPicker color={color} onChange={setColor} />
                <div className="flex justify-between items-center mt-4 mb-2 px-2">
                  <p>{color}</p>
                  <button
                    onClick={() => {
                      onSetFillColor();
                      setShowFillColorPicker(false);
                    }}
                    className="hover:cursor-pointer bg-black px-2 rounded-sm"
                  >
                    OK
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative">
            <FaPencilAlt
              size={50}
              className="p-2 rounded-t-sm"
              style={{
                backgroundColor: showStrokeColorPicker ? "#6a7282" : "transparent",
              }}
              onClick={() => {
                if (showFillColorPicker) setShowFillColorPicker(!showFillColorPicker);
                if (showShapes) {
                  setShowShapes(!showShapes);
                }
                setShowStrokeColorPicker(!showStrokeColorPicker);
              }}
            />
            {showStrokeColorPicker ? (
              <div className="flex flex-col left-0  absolute z-20 bg-[#795ddd] rounded-sm p-2 rounded-tl-none">
                <HexColorPicker color={color} onChange={setColor} />
                <div className="flex justify-between items-center mt-4 mb-2 px-2">
                  <p>{color}</p>
                  <button
                    onClick={() => {
                      onSetStrokeColor();
                      setShowStrokeColorPicker(false);
                    }}
                    className="hover:cursor-pointer bg-black px-2 rounded-sm"
                  >
                    OK
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
	  <button onClick={onExport}>image</button>
          <FaImages size={50} className="p-2" />
          {/* Needs to be finished */}
          {/*<button
            className="p-5 border-2 text-black rounded-sm border-black m-4  hover:cursor-pointer active:translate-y-2 active:duration-200 duration-200"
            onClick={onAddImage}
          >
            Import
          </button>*/}
        </div>
      </header>
      <div className="w-full flex border-t-6 border-[#795ddd]">
        <div className="w-[20%] border-r-6 border-[#795ddd] overflow-scroll h-[85vh]">
          <div className="text-white w-full p-4 grid grid-cols-1 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="w-full h-[12rem]">
                <div className="h-full w-full border-2 border-[#373937] flex justify-center items-center rounded-lg">
                  SLIDES PREVIEW {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full bg-[#030507] flex justify-center items-center p-5">
          <FabricJSCanvas
            className="sample-canvas w-[95%] h-[95%] bg-[#030507] border-2 border-[#373937]"
            onReady={onReady}
          />
        </div>
      </div>
    </div>
  );
}
