import { Link as ChakraLink, Text, Icon, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import {ElementType} from 'react';
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps{
    icon: ElementType;
    children: string;
    href: string;
    shouldMatchExactHref?: boolean;
}

export function NavLinks({icon, children, href, shouldMatchExactHref, ...rest}: NavLinkProps) {
    return(
        <ActiveLink href={href} passHref shouldMatchExactHref={shouldMatchExactHref}>
            <ChakraLink display="flex" alignItems="center" {...rest} >
                <Icon as={icon} fontSize="20" />
                <Text ml="4" fontWeight="medium">{children}</Text>
            </ChakraLink>
        </ActiveLink>
    )
}