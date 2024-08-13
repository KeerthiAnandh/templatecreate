import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd-next";
import { MdDragIndicator } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Item, ItemsMap } from "./types";
import { initialItems } from "@/config/DragDrop";
import {
  DraggableItem,
  CloseButton,
  HeaderDropBox,
  BodyDropBox,
  FooterDropBox,
  ProductDropBox,
  DescriptionDropBox,
  DragHandle,
  MainContent,
  DroppableContainer,
  EmptyBoxMessage,
  Sidebar,
  TabsContainer,
  TabButton,
  DroppableItemsContainer,
  PreviousButton,
  NextButton,
  ButtonContainer,
} from "./TempleteCreation.style";

const TABS = ["header", "body", "footer", "productlist", "Productdetail"] as const;

type Tab = (typeof TABS)[number];

const DragAndDropExample = () => {
  const [items, setItems] = useState<ItemsMap>(initialItems);
  const [destinationBoxItems, setDestinationBoxItems] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("header");
  const [currentView, setCurrentView] = useState<any>(3);
  const [view, setview] = useState<any>(0);
  const [home, setHome] = useState<Item[]>([]);
  const [productlist, setProductlist] = useState<Item[]>([]);
  const [Productdetail, setProductdetail] = useState<Item[]>([]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination)
      return;
    if (destination.droppableId === "destination-box") {
      handleDestinationBoxDrop(source, destination);
    }
  };

  const handleDestinationBoxDrop = (source: any, destination: any) => {
    let newItems = Array.from(destinationBoxItems);

    if (source.droppableId === "destination-box") {
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);
    }
    else if (source.droppableId === "source-box") {
      const draggedItem = createDraggedItem(source);
      newItems.splice(destination.index, 0, draggedItem);
    }
    setDestinationBoxItems(reorderItems(newItems));
  };

  const createDraggedItem = (source: any): Item => {
    const item = items[activeTab][source.index];
    return {
      ...item,
      id: `${item.id}-${Date.now()}`,
    };
  };

  const reorderItems = (items: Item[]): Item[] => {
    const headers = items.filter(
      (item) =>
        item.id.split("-")[0] === "1" || item.id.split("-")[0] === "2"
    );

    const bodies = items.filter(
      (item) =>
        ["3", "4", "5", "6"].some((prefix) => item.id.startsWith(prefix))
    );

    const footers = items.filter(
      (item) =>
        item.id.startsWith("7"));

    const productlist = items.filter(
      (item) =>
        ["8", "9"].some((prefix) => item.id.startsWith(prefix))
    );

    const Productdetail = items.filter(
      (item) =>
        ["10", "11"].some((prefix) => item.id.startsWith(prefix))
    );

    return [...headers, ...bodies, ...footers, ...productlist, ...Productdetail];
  };

  const handleTabClick = (tab: Tab) => setActiveTab(tab);

  const handleRemoveItem = (
    itemId: string,
    source: "source" | "destination"
  ) => {
    if (source === "source") {
      setItems((prevItems) =>
      ({
        ...prevItems,
        [activeTab]: prevItems[activeTab].filter((item) => item.id !== itemId),
      }));

    } else if (source === "destination") {
      setDestinationBoxItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    }
  };

  const handleNextButtonClick = () => {
    debugger
   
    setDestinationBoxItems((prevItems) =>
      prevItems.filter((item) =>
        (currentView === 3 && !["3", "4", "5", "6"].some(prefix => item.id.startsWith(prefix))) ||
        (currentView === 4 && !["8", "9"].some(prefix => item.id.startsWith(prefix))) ||
        (currentView !== 3 && currentView !== 4)
      )
    );
    if(activeTab==="header" || activeTab==="body" || activeTab==="footer"){
      if(home.length!==0){
        setDestinationBoxItems(productlist)
      }else{
        setHome(destinationBoxItems);
      }
    }
    if(activeTab==="productlist"){
      if(productlist.length!==0){
        setDestinationBoxItems(Productdetail)
      }else{
        setProductlist(destinationBoxItems);
      }
    }
    setCurrentView((prevView: any) => Math.min(prevView + 1, 5));
    setview(currentView);
    setActiveTab(currentView === 3 ? "productlist" : currentView === 4 ? "Productdetail" : "header");
  };
  const handlePreviousButtonClick = () => {
    debugger
    console.log(home);
    if(activeTab==="Productdetail"){
      setDestinationBoxItems(productlist);
      setProductdetail(destinationBoxItems);
    }
    if(activeTab==="productlist"){
      setDestinationBoxItems(home);
    }
    // setDestinationBoxItems(home);
    setActiveTab(currentView === 5 ? "productlist" : "header");
    setview((view: any) => (view === 3 ? 0 : view - 1));
    setCurrentView((prevView: any) => Math.max(prevView - 1, 3));
  };
  const renderDraggableItem = (
    item: Item,
    index: number,
    source: "source" | "destination"
  ) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided: any) => (
        <DraggableItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
        >
          {renderDropBox(item, provided, source)}
          {source === "destination" && (
            <CloseButton
              onClick={() => handleRemoveItem(item.id, "destination")}
            >
              <IoClose />
            </CloseButton>
          )}
        </DraggableItem>
      )}
    </Draggable>
  );

  const getPageNumber = () => {
    return currentView-2;
  };
  const renderDropBox = (
    item: Item,
    provided: any,
    source: "source" | "destination"
  ) => {
    const DropBoxComponent =
    {
      header: HeaderDropBox,
      body: BodyDropBox,
      footer: FooterDropBox,
      productlist: ProductDropBox,
      Productdetail: DescriptionDropBox,
    };
    const DropBox = DropBoxComponent[activeTab];
    return (
      <DropBox>
        <DragHandle {...provided.dragHandleProps}>
          {source === "destination" && (
            <div style={{ zIndex: "999" }}>
              <MdDragIndicator />
            </div>
          )}
          <img src={item.imageUrl} width={"100%"} alt={item.content} />
        </DragHandle>
      </DropBox>
    );
  };

  const renderSourceBox = () => (
    <>
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

      <ButtonContainer>
        <PreviousButton onClick={handlePreviousButtonClick} disabled={currentView === 3}>Previous</PreviousButton>

        <NextButton onClick={handleNextButtonClick} disabled={currentView === 5}>Next</NextButton>
      </ButtonContainer>
    </>
  );

  const renderDestinationBoxItems = () => {
    const headerItems = destinationBoxItems.filter(item =>
      item.id.split("-")[0] === "1" || item.id.split("-")[0] === "2"
    );

    const footerItems = destinationBoxItems.filter(item =>
      item.id.startsWith("7")
    );

    const middleItems = destinationBoxItems.filter(item =>
      !headerItems.includes(item) && !footerItems.includes(item)
    );

    return (
      <>
        {headerItems.map((item, index) => renderDraggableItem(item, index, "destination"))}
        {middleItems.map((item, index) => renderDraggableItem(item, index, "destination"))}
        {footerItems.map((item, index) => renderDraggableItem(item, index, "destination"))}
      </>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex" }}>
        <MainContent>
          <Droppable droppableId="destination-box">
            {(provided: any) => (
              <DroppableContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {destinationBoxItems.length === 0 ? (
                  <EmptyBoxMessage>
                    Drag and Drop here
                  </EmptyBoxMessage>
                ) : (
                  renderDestinationBoxItems()
                )}
                {provided.placeholder}
              </DroppableContainer>
            )}
          </Droppable>
          <h3>Page {getPageNumber()}</h3>
        </MainContent>
        <Sidebar>
          <TabsContainer>
            {TABS.slice(view, currentView).map((tab) => (
              <TabButton
                key={tab}
                onClick={() => {
                  handleTabClick(tab);
                }}
                active={activeTab === tab}
              >
                {`${tab.charAt(0).toUpperCase()}${tab.slice(1)}`}
                ({items[tab].length})
              </TabButton>
            ))}
          </TabsContainer>
          {renderSourceBox()}
        </Sidebar>
      </div>
    </DragDropContext>
  );
};

export default DragAndDropExample;
