import { Flex, IconButton, useBreakpointValue, Icon } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSideBarDrawer } from "../../contexts/SideBarDrawerContext";
import { Logo } from "./Logo";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header(){

    const {onOpen} = useSideBarDrawer();

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })
    
    return(
        <Flex w="100%" h="20" maxWidth={1480} as="header" mx="auto" mt="4" px="6" align='center' >
            
            {!isWideVersion && (
                <IconButton icon={<Icon as={RiMenuLine}/>} fontSize="24" variant="unstyled" onClick={onOpen} aria-label="Open Navigation" mr="2">

                </IconButton>
            )}

            <Logo  />


            {isWideVersion && ( <SearchBox />)}

            <Flex align="center" ml="auto">   
                <NotificationsNav />
                <Profile showProfileData={isWideVersion} />
            </Flex>

        </Flex>
    )
}