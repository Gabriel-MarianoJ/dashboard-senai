import Chart from 'react-apexcharts';
import { useEffect, useState } from "react";
import axios from "axios";

const LineChart = () => {

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
        axios.get(`http://localhost:3001/api/avanco`).then((response) => {
            const myLabels = response.data.map((x) => formatar(x.data_hora)).reverse();
            const mySeries = response.data.map((x) => x.avanco).reverse();

            setCharData({
                labels: {
                    categories: myLabels,
                },
                series: [
                    {
                        name: "Avanço",
                        data: mySeries,
                    },
                ],
            });
        });
    }, []);

    const options = {
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'straight'
        }
    }

    return (
        <>
            <h2 className="text-secondary">Avanço</h2>
            <Chart
                options={{ ...options, xaxis: charData.labels }}
                type="line"
                height="300"
                series={charData.series} />
        </>
    );
}

export default LineChart;