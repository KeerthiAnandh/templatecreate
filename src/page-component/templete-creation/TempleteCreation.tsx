import React from "react";
import { DragDropContext } from "react-beautiful-dnd-next";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import useTemplate from "@/hooks/useTemplate";
import TemplateBar from "./helper-comonent/TemplateBar";
import TemplatePage from "./helper-comonent/TemplatePage";
import { CloseButton, DeployButton, DragHandle, MainContent, Pagenumber, Sidebar } from "./TempleteCreation.style";
import { MdDragIndicator } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { DraggableItem } from "./TempleteCreation.style";
import { Item } from "./types";
import { Draggable } from "react-beautiful-dnd-next";
 
const DragAndDropExample = () => {
  const {
    items,
    destinationBoxItems,
    activeTab,
    currentView,
    deletedItems,
    handleTabChange,
    onDragEnd,
    handleNextButtonClick,
    handlePreviousButtonClick,
    handleRemoveItem,
  } = useTemplate();

  const renderDraggableItem = (item: Item, index: number, source: "source" | "destination") => (
    <Draggable draggableId={item.id} index={index}>
      {(provided: any) => (
        <DraggableItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DragHandle {...provided.dragHandleProps}>
            {source === "destination" && (
              <div style={{ zIndex: "999" }}>
                <MdDragIndicator />
              </div>
            )}
            <img src={item.imageUrl} width={"100%"} alt={item.content} />
          </DragHandle>
          {source === "destination" && (
            <CloseButton onClick={() => handleRemoveItem(item.id, "destination")}>
              <IoClose />
            </CloseButton>
          )}
        </DraggableItem>
      )}
    </Draggable>
  );

  const getVisibleTabs = () => {
    switch (currentView) {
      case 3:
        return ["header", "body", "footer"];
      case 4:
        return ["productlist"];
      case 5:
        return ["Productdetail"];
      default:
        return [];
    }
  };

  const getPageNumber = () => currentView - 2;

  const deploybutton = (items:any, type: string) =>
    items.some((item:any) => item.type === type);

  const isDeployable = Object.values(destinationBoxItems).some((items: Item[]) => 
    deploybutton(items, 'header') && deploybutton(items, 'footer')
  );
  
  const handleDeploy = () => {
    if (isDeployable) {
      console.log("Deployed!");
    } else {
      console.log("Deployment failed: Header and Footer are required.");
    }
  };

  const renderDeployButton = () => (
    <Pagenumber>
      Page {getPageNumber()}
      <DeployButton onClick={handleDeploy} disabled={!isDeployable}>
        Deploy
      </DeployButton>
    </Pagenumber>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex" }}>
        <MainContent style={{ flex: 1 }}>
          <TemplatePage
            destinationBoxItems={destinationBoxItems}
            currentView={currentView}
            deletedItems={deletedItems}
            renderDraggableItem={renderDraggableItem}
          />
          {renderDeployButton()}
        </MainContent>
        <Sidebar>
          <Box>
            <Tabs
              value={getVisibleTabs().indexOf(activeTab)}
              onChange={handleTabChange}
              aria-label="Drag and Drop Tabs"
            >
              {getVisibleTabs().map(tab => (
                <Tab label={tab.charAt(0).toUpperCase() + tab.slice(1)} key={tab} />
              ))}
            </Tabs>
          </Box>
          <div style={{ flex: 1 }}>
            <TemplateBar
              items={items}
              activeTab={activeTab}
              renderDraggableItem={renderDraggableItem}
            />
          </div>
          <Box>
            <MobileStepper
              variant="text"
              steps={3}
              position="static"
              activeStep={getPageNumber()}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNextButtonClick}
                  disabled={currentView === 5}
                >
                  Next
                </Button>
              }
              backButton={
                <Button
                  onClick={handlePreviousButtonClick}
                  disabled={currentView === 3}
                >
                  Back
                </Button>
              }
            />
          </Box>
        </Sidebar>
      </div>
    </DragDropContext>
  );
};

export default DragAndDropExample;
