"use client";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { IText } from "fabric";
import { RxText } from "react-icons/rx";
import { LuShapes } from "react-icons/lu";
import { CgShapeCircle, CgShapeSquare } from "react-icons/cg";
import { IoMdColorFill } from "react-icons/io";

import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

export default function Home() {
  const { editor, onReady } = useFabricJSEditor();
  const [canvasState, setCanvasState] = useState([]);
  const [color, setColor] = useState("#aabbcc");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showShapes, setShowShapes] = useState(false);

  const onAddCircle = () => {
    editor?.addCircle();
  };
  const onAddRectangle = () => {
    editor?.addRectangle();
  };
  const onAddText = () => {
    const tb = new IText("foobar");
    editor?.canvas.add(tb);
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

  const onExport = () => {
    setCanvasState(editor?.canvas.toJSON());
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
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onDelete]);

  return (
    <div className="w-full h-full bg-blue-500">
      <header className="h-[15vh]">
        <div className="flex justify-center">
          <div className="relative">
            <LuShapes
              size={40}
              className="group"
              onClick={() => {
                setShowShapes(!showShapes);
              }}
            />
            {showShapes ? (
              <div className="flex flex-col left-0 -bottom-10 absolute z-20">
                <CgShapeCircle size={40} onClick={onAddCircle} />
                <CgShapeSquare size={40} onClick={onAddRectangle} />
              </div>
            ) : (
              ""
            )}
          </div>
          <RxText
            className="hover:cursor-pointer active:translate-y-2 active:duration-200 duration-200"
            onClick={onAddText}
            size={40}
          />
          <div className="relative">
            <IoMdColorFill
              size={40}
              onClick={() => {
                setShowColorPicker(!showColorPicker);
              }}
            />
            {showColorPicker ? (
              <div className="flex flex-col left-0 -bottom-45 absolute z-20">
                <HexColorPicker color={color} onChange={setColor} />
                {color}
                <button
                  onClick={() => {
                    onSetFillColor();
                    setShowColorPicker(false);
                  }}
                  className="border-2 border-black"
                >
                  X
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            className="p-5 border-2 text-black rounded-sm border-black m-4  hover:cursor-pointer active:translate-y-2 active:duration-200 duration-200"
            onClick={onSetStrokeColor}
          >
            Set Stroke
          </button>
          <button
            className="p-5 border-2 text-black rounded-sm border-black m-4  hover:cursor-pointer active:translate-y-2 active:duration-200 duration-200"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="p-5 border-2 text-black rounded-sm border-black m-4  hover:cursor-pointer active:translate-y-2 active:duration-200 duration-200"
            onClick={onExport}
          >
            Export
          </button>
          <button
            className="p-5 border-2 text-black rounded-sm border-black m-4  hover:cursor-pointer active:translate-y-2 active:duration-200 duration-200"
            onClick={onImport}
          >
            Import
          </button>
          <button
            className="p-5 border-2 text-black rounded-sm border-black m-4  hover:cursor-pointer active:translate-y-2 active:duration-200 duration-200"
            onClick={onDebug}
          >
            Debug
          </button>
        </div>
      </header>
      <div className="flex">
        <div className="w-full flex flex-col">
          <FabricJSCanvas className="sample-canvas w-full h-[80vh] border-2 border-black" onReady={onReady} />
        </div>
      </div>
    </div>
  );
}
