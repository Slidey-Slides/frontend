"use client";
import { useState } from 'react';
import { HexColorPicker } from "react-colorful";
import { IText } from 'fabric';

import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

export default function Home() {
  const { editor, onReady } = useFabricJSEditor();
  const [canvasState, setCanvasState] = useState([])
  const [color, setColor] = useState("#aabbcc");

  editor?.canvas.set("backgroundColor", "#FFFFFF");
  editor?.canvas.requestRenderAll();

  const onAddCircle = () => {
    editor?.addCircle();
  };
  const onAddRectangle = () => {
    editor?.addRectangle();
  };
  const onAddText = () => {
    const tb = new IText('foobar');
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
  };
  const onImport = () => {
    editor?.canvas.loadFromJSON(canvasState).then(
      (canvas) => canvas.requestRenderAll()
    );
  };
  const onDebug = () => {
    console.log(canvasState);
  };

  return (
    <div>
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <button onClick={onAddText}>Add Text</button>
      <button onClick={onSetFillColor}>Set Fill</button>
      <button onClick={onSetStrokeColor}>Set Stroke</button>
      <button onClick={onSetBackgroundColor}>Set Background</button>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onExport}>Export</button>
      <button onClick={onImport}>Import</button>
      <button onClick={onDebug}>Debug</button>
      <HexColorPicker color={color} onChange={setColor} />
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
