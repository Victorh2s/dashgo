import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps{
    showProfileData?: boolean;
}

export function Profile({showProfileData}: ProfileProps){
    return(
        
        <Flex align="center">
            {showProfileData && (
            <Box mr="4" textAlign="right">
                <Text>Victor Henrique</Text>
                <Text color="gray.300"> victor.henriqueoff@gmail.com </Text>
            </Box>
            )}
            <Avatar size="md" name="Victor Henrique" src="https://github.com/victorh2s.png" />
        </Flex>
    )
}