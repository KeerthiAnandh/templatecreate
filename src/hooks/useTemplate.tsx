'use client';
import { useState } from "react";
import { Item,ItemsMap } from "@/page-component/template/types";
import { initialItems } from "@/config/DragDrop";
// import { createStrapiCollection } from "@/service/Service";
// import { FooterCollections } from "@/config/strapi.config/footer.config";
// import { BodyCollections } from "@/config/strapi.config/body.config";
// import { HeaderCollections } from "@/config/strapi.config/header.config";
const TABS = ["header", "body", "footer", "productlist", "Productdetail"] as const;
type Tab = (typeof TABS)[number];

const useTemplate = () => {
  const [items, setItems] = useState<ItemsMap>(initialItems);
  const [defaults, setDefaults] = useState<Item[]>([]);
  const [destinationBoxItems, setDestinationBoxItems] = useState<any>({ 3: [], 4: [], 5: [] })
  const [activeTab, setActiveTab] = useState<Tab>("header");
  const [currentView, setCurrentView] = useState<number>(3);
  const [lastViewState, setLastViewState] = useState<{ [key: number]: Tab }>({});
  const [deletedItems, setDeletedItems] = useState<Item[]>([]);

  const handleTabChange = (_event: any, newValue: number) => {
    setActiveTab(TABS[newValue]);
  };
  
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    if (destination.droppableId === "destination-box") {
      handleDestinationBoxDrop(source, destination);
    }
  };

  const handleDestinationBoxDrop = (source: any, destination: any) => {
    const currentItems = destinationBoxItems[currentView] || [];
    let newItems:any = Array.from(currentItems);

    if (source.droppableId === "destination-box") {
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);
    } else if (source.droppableId === "source-box") {
      const draggedItem = createDraggedItem(source);
      newItems.splice(destination.index, 0, draggedItem);
    }

    setDefaults(newItems.filter((item: { content: string; }) => item.content === "Header" || item.content === "Footer"));
    setDestinationBoxItems((prev: any) => ({ ...prev, [currentView]: reorderItems(newItems) }));
  };

  const createDraggedItem = (source: any): Item => {
    const item = items[activeTab][source.index];
    return { ...item, id: `${item.id}-${Date.now()}` };
  };

  const reorderItems = (items: Item[]): Item[] => {
    const headers = items.filter(item => item?.id?.startsWith("1") || item?.id?.startsWith("2"));
    const footers = items.filter(item => item?.id?.startsWith("7"));
    const middleItems = items.filter(item => !headers.includes(item) && !footers.includes(item));
    return [...headers, ...middleItems, ...footers];
  };

  const handleNextButtonClick = () => {
    if (currentView === 3) {
      setDestinationBoxItems((prevState: any[][]) => ({
        ...prevState,
        4: [
          ...prevState[4].filter(item => item.content !== "Header" && item.content !== "Footer"),
          ...defaults,
        ],
        5: [
          ...prevState[5].filter(item => item.content !== "Header" && item.content !== "Footer"),
          ...defaults,
        ],
      }));
    }
    saveCurrentViewState();
    setCurrentView(prevView => Math.min(prevView + 1, 5));
    setActiveTab(currentView === 3 ? "productlist" : currentView === 4 ? "Productdetail" : "header");
  };

  const handlePreviousButtonClick = () => {
    saveCurrentViewState();
    setCurrentView(prevView => Math.max(prevView - 1, 3));
    restoreLastViewState();
  };

  const saveCurrentViewState = () => {
    setLastViewState(prevState => ({ ...prevState, [currentView]: activeTab }));
  };

  const restoreLastViewState = () => {
    if (lastViewState[currentView - 1]) {
      setActiveTab(lastViewState[currentView - 1] as Tab);
    }
  };

  const handleRemoveItem = (itemId: string, source: "source" | "destination") => {
    const itemToDelete = destinationBoxItems[currentView].find((item: { id: string; }) => item.id === itemId);

    if (itemToDelete && (itemToDelete.content === "Header" || itemToDelete.content === "Footer")) {
      setDeletedItems(prev => [...prev, itemToDelete]);
    }

    if (source === "source") {
      setItems(prevItems => ({
        ...prevItems,
        [activeTab]: prevItems[activeTab].filter(item => item.id !== itemId),
      }));
    } else if (source === "destination") {
      setDestinationBoxItems((prev: any[][]) => ({
        ...prev,
        [currentView]: prev[currentView].filter(item => item.id !== itemId),
      }));
    }
  };
  //  const getFormData = (items: Item[], collections: any) =>
  //     items.map((item) => {
  //       const key = item.content.toLowerCase().replace(" ", "");
  //       return collections[key as keyof typeof collections];
  //     });
      
  // // const handleDeploy = async () =>
  // //    {
  // //   try 
  // //   {
  // //     const headers = getFormData(
  // //       destinationBoxItems.filter(
  // //         (item) => item.id.startsWith("1") || item.id.startsWith("2")
  // //       ),
  // //       HeaderCollections
  // //     );
  // //     const bodies = getFormData(
  // //       destinationBoxItems.filter((item) =>
  // //         ["1", "2", "3", "4"].some((prefix) => item.id.startsWith(prefix))
  // //       ),
  // //       BodyCollections
  // //     );
  // //     const footers = getFormData(
  // //       destinationBoxItems.filter((item) => item.id.startsWith("1")),
  // //       FooterCollections
  // //     );

  // //     const formData = 
  // //     {
  // //       header: headers.length > 0 ? headers[0] : null,
  // //       body: bodies,
  // //       footer: footers.length > 0 ? footers[0] : null,
  // //     };

  // //     await createStrapiCollection(formData);
  // //     } 
  // //     catch (error)
  // //    {
  // //     console.error("Error creating eCommerce data:", error);
  // //   }
  // // };
  return {
    items,
    defaults,
    destinationBoxItems,
    activeTab,
    currentView,
    deletedItems,
    handleTabChange,
    onDragEnd,
    handleNextButtonClick,
    handlePreviousButtonClick,
    handleRemoveItem,
    // handleDeploy,
  };
};

export default useTemplate;
