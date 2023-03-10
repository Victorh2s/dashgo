import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, Link } from "@chakra-ui/react";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/SideBar";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { User } from "../../services/mirage";
import NextLink from 'next/link';
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";

export interface Users extends User {
    id: string;
}

export default function UserList({users}){
    const [page, setPage] = useState(1)
    const { data, isLoading, isFetching, error} = useUsers(page, {
        initialData: users,
    })


    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    async function handlePerfetchUser(userId: string ){
        await queryClient.prefetchQuery(['user', userId], async ()=> {
            const response = await api.get(`users/${userId}`)
            
            return response.data;
        }, {
            staleTime: 1000 * 60 * 10, // 10 minutes
        })
    }

 // responsive scrool table   
    return(
        <Box>
            <Header/>

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            {!isLoading && isFetching && <Spinner size={"sm"} color="gray.500" ml="4"/>}
                        </Heading>
                        <NextLink href="/users/create" passHref>
                            <Button size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine} />} >
                                Criar novo
                            </Button>
                        </NextLink>
                    </Flex>

                   {isLoading ? (
                    <Flex justify="center">
                        <Spinner/>
                    </Flex>
                   ): error ? (
                    <Flex justify="center">
                        <Text>Falha ao obter dado dos usuários.</Text>
                    </Flex>
                   )  : (
                    <>
                    
                        <Table colorScheme="whiteAlpha">
                            <Thead>
                                <Tr>
                                    <Th px={["4","4","6"]} color="gray.300" width="8">
                                        <Checkbox colorScheme="pink" />
                                    </Th>

                                    <Th>Usuários</Th>
                                    { isWideVersion && <Th>Data de cadastro</Th>}
                                    {/* <Th width="8"></Th> */}
                                </Tr>
                            </Thead>
                            <Tbody>
                              {data?.users.map((user:Users) => {
                                return (
                                    <Tr key={user.id}>
                                    <Td px={["4","4","6"]}>
                                            <Checkbox colorScheme="pink" />
                                    </Td> 
                                    <Td>
                                            <Box>
                                                <Link color="purple.400" onMouseEnter={()=> handlePerfetchUser(user.id)}>
                                                    <Text fontWeight="bold" >{user.name}</Text>
                                                </Link>
                                                <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                            </Box>
                                    </Td>
    
                                    {isWideVersion && <Td>{user.created_at}</Td>}
    
                                    {/* {isWideVersion && (
                                        <Td>
                                            <Button as="a" size="sm" fontSize="sm" colorScheme="purple" leftIcon={<Icon as={RiPencilLine} />}>
                                                    Editar
                                            </Button>
                                    </Td>
                                    )} */}
                                    </Tr>
                                )
                              })}
                            </Tbody>
                        </Table>
                        <Pagination totalCountOfRegisters={data.totalCount} currentPage={page} onPageChange={setPage} />
                    </>
                   )}
                </Box>
             </Flex>
        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const {users, totalCount} = await getUsers(1);

    return {
        props:{
            users,
        }
    }
}