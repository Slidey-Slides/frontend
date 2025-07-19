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

  const onSetBackgroundColor = () => {
    editor?.canvas.set("backgroundColor", color);
    editor?.canvas.requestRenderAll();
  };

  const onExport = () => {
    setCanvasState(editor?.canvas.toJSON());

    console.log(JSON.stringify(editor?.canvas.toJSON()));
  };

  const onImport = () => {
    editor?.canvas
      .loadFromJSON(canvasState)
      .then((canvas) => canvas.requestRenderAll());
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
    <div className="h-full w-full bg-blue-500">
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
              <div className="absolute -bottom-10 left-0 z-20 flex flex-col">
                <CgShapeCircle size={40} onClick={onAddCircle} />
                <CgShapeSquare size={40} onClick={onAddRectangle} />
              </div>
            ) : (
              ""
            )}
          </div>
          <RxText
            className="duration-200 hover:cursor-pointer active:translate-y-2 active:duration-200"
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
              <div className="absolute -bottom-45 left-0 z-20 flex flex-col">
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
            className="m-4 rounded-sm border-2 border-black p-5 text-black duration-200 hover:cursor-pointer active:translate-y-2 active:duration-200"
            onClick={onSetStrokeColor}
          >
            Set Stroke
          </button>
          <button
            className="m-4 rounded-sm border-2 border-black p-5 text-black duration-200 hover:cursor-pointer active:translate-y-2 active:duration-200"
            onClick={onSetFillColor}
          >
            Set Fill
          </button>
          <button
            className="m-4 rounded-sm border-2 border-black p-5 text-black duration-200 hover:cursor-pointer active:translate-y-2 active:duration-200"
            onClick={onDelete}
          >
            Delete
          </button>

          <button
            className="m-4 rounded-sm border-2 border-black p-5 text-black duration-200 hover:cursor-pointer active:translate-y-2 active:duration-200"
            onClick={onExport}
          >
            Export
          </button>

          <button
            className="m-4 rounded-sm border-2 border-black p-5 text-black duration-200 hover:cursor-pointer active:translate-y-2 active:duration-200"
            onClick={onImport}
          >
            Import
          </button>

          <button
            className="m-4 rounded-sm border-2 border-black p-5 text-black duration-200 hover:cursor-pointer active:translate-y-2 active:duration-200"
            onClick={onDebug}
          >
            Debug
          </button>
        </div>
      </header>
      <div className="flex">
        <div className="flex w-full flex-col">
          <FabricJSCanvas
            className="sample-canvas h-[80vh] w-full border-2 border-black"
            onReady={onReady}
          />
        </div>
      </div>
    </div>
  );
}
