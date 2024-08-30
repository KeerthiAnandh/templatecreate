import React from "react";
import { Droppable } from "react-beautiful-dnd-next";
import { DroppableItemsContainer } from "../TempleteCreation.style";
import { Item } from "../types";

interface TemplateBarProps {
  items: { [key: string]: Item[] };
  activeTab: string;
  renderDraggableItem: (item: Item, index: number, source: "source" | "destination") => JSX.Element;
}

const TemplateBar: React.FC<TemplateBarProps> = ({ items, activeTab, renderDraggableItem }) => {
  return (
    <Droppable droppableId="source-box">
      {(provided: any) => (
        <DroppableItemsContainer
          activeTab={activeTab}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {items[activeTab].map((item, index) =>
            renderDraggableItem(item, index, "source")
          )}
          {provided.placeholder}
        </DroppableItemsContainer>
      )}
    </Droppable>
  );
};

export default TemplateBar;
