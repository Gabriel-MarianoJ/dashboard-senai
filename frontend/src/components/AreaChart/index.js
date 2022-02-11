import Chart from 'react-apexcharts';
import { useEffect, useState } from "react";
import axios from "axios";

const AreaChart = () => {

    const [charData, setCharData] = useState({
        labels: {
            categories: [],
        },
        series: [
            {
                name: "",
                data: [],
            },
        ],
    });

    const formatar = (data) => {
        var a = data.split('T');
        var b = a[0].split('-');
        var c = a[1].split(':');
        var d = c[2].split('.');

        return b[2] + "/" + b[1] + " - " + c[0] + ":" + c[1] + ":" + d[0];
    }
    //"ID: " + x.id.toFixed(0)
    useEffect(() => {
        axios.get(`http://localhost:3001/api/rotacao`).then((response) => {
            const myLabels = response.data.map((x) => formatar(x.data_hora)).reverse();
            const mySeries = response.data.map((x) => x.rotacao).reverse();

            setCharData({
                labels: {
                    categories: myLabels,
                },
                series: [
                    {
                        name: "Rotação",
                        data: mySeries,
                    },
                ],
            });
        });
    }, []);

    const options = {
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 7,
                inverseColors: false,
                opacityFrom: 10,
                opacityTo: 0,
                stops: []
            }
        },
        dataLabels: {
            enabled: true,
        }
    }

    return (
        <>
            <h2 className="text-secondary">Rotação</h2>
            <Chart
                options={{ ...options, xaxis: charData.labels }}
                type="area"
                height="300"
                series={charData.series} />
        </>
    );
}

export default AreaChart;