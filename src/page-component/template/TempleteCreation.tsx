//TempleteCreation.tsx
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
import { createStrapiCollection } from "@/service/Service";
import { BodyCollections } from "@/config/strapi.config/body.config";
import { HeaderCollections } from "@/config/strapi.config/header.config";
import { FooterCollections } from "@/config/strapi.config/footer.config";

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
    const tabMap: { [key: number]: string[] } = {
      3: ["header", "body", "footer"],
      4: ["productlist"],
      5: ["Productdetail"],
    };

    return tabMap[currentView] || [];
  };

  const getPageNumber = () => currentView - 2;

  const getFormData = (items: any, collections: any) =>
    items.map((item: any) => {
      debugger
      const key = item.content1.toLowerCase().replace(" ", "");
      return collections[key as keyof typeof collections];
    });

  const handleDeploy = async () => {
    debugger
      try 
      {
    const headers: any = getFormData(
      destinationBoxItems[3].filter(
        (item: any) => item.content === "Header"
      ),
      HeaderCollections
    );

    const bodies = getFormData(
      destinationBoxItems[3].filter(
        (item: any) =>
          item.content === "Body"
      ),
      BodyCollections
    );
        const footers = getFormData(
          destinationBoxItems[3].filter(
            (item:any) => item.content==="Footer"
          ),
          FooterCollections
        );

        // const productlist = getFormData(
        //   destinationBoxItems[4].filter(
        //     (item:any) => item.content==="Productlist"
        //   ),
        //   FooterCollections
        // );

        // const Productdetail = getFormData(
        //   destinationBoxItems[5].filter(
        //     (item:any) => item.content==="Productdetail"
        //   ),
        //   ProductDetailsCollections
        // );
        
    const formData =
    {
      header: headers.length > 0 ? headers[0] : null,
      body: bodies,
      footer: footers.length > 0 ? footers[0] : null,
      // productlist: bodies,
      // Productdetail:Productdetail,
    };

    await createStrapiCollection(formData);
        } 
        catch (error)
       {
        console.error("Error creating eCommerce data:", error);
      }
  };
  const renderDeployButton = () => (
    <Pagenumber>
      Page {getPageNumber()}
      <DeployButton onClick={handleDeploy} >
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
