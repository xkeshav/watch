import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

type DraggablePanelProps = {
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
};

export const DraggablePanel = ({
  children,
  initialPosition = { x: 20, y: 70 },
}: DraggablePanelProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef({
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("[data-drag-handle]")) {
        setIsDragging(true);
        dragRef.current = {
          startX: e.clientX,
          startY: e.clientY,
          offsetX: position.x,
          offsetY: position.y,
        };
        e.preventDefault();
      }
    },
    [position],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      setPosition({
        x: dragRef.current.offsetX + (e.clientX - dragRef.current.startX),
        y: dragRef.current.offsetY + (e.clientY - dragRef.current.startY),
      });
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);


  const panelContent = (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 2147483647,
        width: "500px",
        minWidth: "300px",
        maxWidth: "90vw",
        height: "400px",
        minHeight: "150px",
        maxHeight: "calc(100vh - 100px)",
        overflow: "hidden",
        backgroundColor: "white",
        border: "1px solid rgba(0, 0, 0, 0.8)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        borderRadius: "4px",
        resize: "both",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        data-drag-handle
        onMouseDown={handleMouseDown}
        style={{
          padding: "8px 12px",
          background: "#0f2d51",
          color: "white",
          cursor: isDragging ? "grabbing" : "grab",
          fontWeight: 600,
          fontSize: "0.875rem",
          userSelect: "none",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>🔍 Debug Panel</span>
        <span style={{ fontSize: "1rem", opacity: 0.75 }}>drag to move</span>
      </div>

      <div
        style={{
          padding: "0.5rem",
          overflow: "auto",
          overflowX: "hidden",
          flex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(panelContent, document.body);
};;
