import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {createContext, useContext, useEffect} from 'react';

interface SideBarDrawerProviderProps{
    children: React.ReactNode;
}

type SideBarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SideBarDrawerContextData);

export function SideBarDrawerProvider({children}:SideBarDrawerProviderProps){
    const disclosure = useDisclosure()
    const router = useRouter()
    

    useEffect(()=> {
        disclosure.onClose()
    }, [router.asPath]) 
    
    return(
        <SidebarDrawerContext.Provider value={disclosure} >
            {children}
        </SidebarDrawerContext.Provider>
    )
}

export const useSideBarDrawer = () => useContext(SidebarDrawerContext)