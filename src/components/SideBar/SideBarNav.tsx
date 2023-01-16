import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLinks } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBarNav(){
    return(
        <Stack spacing="12" align="flex-start">
                
                <NavSection title="Geral" >
                    <NavLinks icon={RiDashboardLine} href="/dashboard">
                        Dashboard
                    </NavLinks>

                    <NavLinks icon={RiContactsLine} href="/users">
                        Usuários
                    </NavLinks>
                </NavSection>

                <NavSection title="AUTOMAÇÃO">
                    <NavLinks icon={RiInputMethodLine} href="/forms">
                        Formulários
                    </NavLinks>
                    
                    <NavLinks icon={RiGitMergeLine} href="/automation">
                        Automação
                    </NavLinks>
                </NavSection>

            </Stack>
    )
}