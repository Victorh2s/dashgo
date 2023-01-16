import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from 'apexcharts';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/SideBar";


const Chart = dynamic(()=> import('react-apexcharts'),{
    ssr: false,
})


const options = {
    chart: {
        width:'100%',
        toolbar: {
            show: false,
        },
    zoom:{
        enabled:false,
    },
    foreColor: theme.colors.gray[500],
    },
    grid:{
        show: false,
    },
    dataLabels:{
        enabled: false,
    },
    
    xaxis:{
        type: 'datetime',
        axisBorder: {
            color: theme.colors.gray[600],
        },
        axisTicks:{
            color: theme.colors.gray[600],
        },
        categories:[
            '2023-01-05T00:00:00.000Z',
            '2023-01-06T00:00:00.000Z',
            '2023-01-07T00:00:00.000Z',
            '2023-01-08T00:00:00.000Z',
            '2023-01-09T00:00:00.000Z',
            '2023-01-10T00:00:00.000Z',
            '2023-01-11T00:00:00.000Z',
        ],
    },
    fill:{
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3
        },
    }
} as ApexOptions;

const series: ApexAxisChartSeries | ApexNonAxisChartSeries=[
    {
        name: 'series1', data:[31,120,10,38,51,19,202]
    }
]

export default function Dashboard(){
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
       setShowChart(true)
    }, [])

    
    return (
        <Flex direction="column" h="100vh" >
            <Header/>
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar/>
                    <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
                        <Box p={["6","8"]} bg="gray.800" borderRadius={8}>
                            <Text fontSize="lg" mb="4"> Inscritos da semanda</Text>
                            {showChart && (
                                <Chart options={options } series={series} type="area" height={160} width={options.chart?.width} />
                            )}
                        </Box>
                        <Box p={["6","8"]} bg="gray.800" borderRadius={8}>
                            <Text fontSize="lg" mb="4"> Taxa de abertura</Text>
                            {showChart && (
                                <Chart options={options } series={series} type="area" height={160} width={options.chart?.width} />
                            )}
                        </Box>

                    </SimpleGrid>
            </Flex>
        </Flex>
    )
}