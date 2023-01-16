import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useSideBarDrawer } from "../../contexts/SideBarDrawerContext";
import { SideBarNav } from "./SideBarNav";


export function Sidebar(){
    const {isOpen, onClose} = useSideBarDrawer();
    const isFloatingSideBar = useBreakpointValue({
        base: true,
        lg: false,
    })

    if(isFloatingSideBar) {
       return(
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent bg="gray.800" p="4">
                    <DrawerCloseButton mt="6"/>
                        <DrawerHeader>Navegação</DrawerHeader>
                        <DrawerBody>
                            <SideBarNav/>
                        </DrawerBody>
                </DrawerContent>
        </DrawerOverlay>
        </Drawer>
       )
    }
    
    return(
        <Box as="aside" width="64" mr="8" px="2" >
            <SideBarNav />
        </Box>
    )
}