import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import axios from "axios";

const BarChart = () => {
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

    return b[2] + "/" + b[1] + "/" + b[0] + "  " + c[0] + ":" + c[1] + ":" + d[0];
  }
  //"ID: " + x.id.toFixed(0)
  useEffect(() => {
    axios.get(`http://localhost:3001/api/temperatura`).then((response) => {
      const myLabels = response.data.map((x) => formatar(x.data_hora)).reverse();
      const mySeries = response.data.map((x) => x.temperatura).reverse();

      setCharData({
        labels: {
          categories: myLabels,
        },
        series: [
          {
            name: "°C",
            data: mySeries,
          },
        ],
      });
    });
  }, []);

  const options = {
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    fill: {
      colors: ['#ff6a0d']
    }
  };

  return (
    <>
      <h2 className="text-secondary">Temperatura</h2>
      <h6 className='text-secondary'>Últimos 20 segundos</h6>
      <Chart
        options={{ xaxis: charData.labels, ...options }}
        series={charData.series}
        type="bar"
        height="300"
      />
    </>
  );
};

export default BarChart;
