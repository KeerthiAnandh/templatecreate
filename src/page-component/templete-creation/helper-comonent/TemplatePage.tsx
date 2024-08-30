import React from "react";
import { Droppable } from "react-beautiful-dnd-next";
import { Item } from "../types";
import { DroppableContainer,EmptyBoxMessage } from "../TempleteCreation.style";

interface TemplatePageProps {
  destinationBoxItems: { [key: number]: Item[] };
  currentView: number;
  deletedItems: Item[];
  renderDraggableItem: (item: Item, index: number, source: "source" | "destination") => JSX.Element;
}

const TemplatePage: React.FC<TemplatePageProps> = ({
  destinationBoxItems,
  currentView,
  deletedItems,
  renderDraggableItem
}) => {
  const currentItems = destinationBoxItems[currentView] || [];
  
  const filteredItems = currentItems.filter(
    item => !deletedItems.some(deletedItem => deletedItem.id === item.id)
  );
  
  const headerItems = filteredItems.filter(item => item.content === "Header");
  const footerItems = filteredItems.filter(item => item.content === "Footer");
  const middleItems = filteredItems.filter(item => item.content !== "Header" && item.content !== "Footer");
  return (
    <Droppable droppableId="destination-box">
      {(provided: any) => (
        <DroppableContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {destinationBoxItems[currentView]?.length === 0 ? (
            <EmptyBoxMessage>Drag and Drop here</EmptyBoxMessage>
          ) : (
            <>
              {headerItems.map((item, index) => renderDraggableItem(item, index, "destination"))}
              {middleItems.map((item, index) => renderDraggableItem(item, index, "destination"))}
              {footerItems.map((item, index) => renderDraggableItem(item, index, "destination"))}
            </>
          )}
          {provided.placeholder}
        </DroppableContainer>
      )}
    </Droppable>
  );
};

export default TemplatePage;
