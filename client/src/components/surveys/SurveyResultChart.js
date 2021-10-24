import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart } from "chart.js"
import ChartLabels from 'chartjs-plugin-labels';
Chart.register(ChartLabels);

const SurveyResultChart = (props) => {
    const data = {
        datasets: [{
            data: props.data,
            backgroundColor: [
                '#15fd4f',
                '#b2ff59',
                '#ffea00',
                '#ffb310',
                '#ff4c16'
            ],
            borderWidth: 0
        }]
    }
    const options = {
        maintainAspectRatio: false,
        /*tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const currentValue = dataset.data[tooltipItem.index];
                    let total = 0;
                    for (let i = 0; i < data.datasets.length; i++) {
                        total += data.datasets[i].data[tooltipItem.index];
                    }
                    const percentage = parseFloat((currentValue / total * 100).toFixed(0));
                    return `${percentage}%`;
                }
            },
            title: (tooltipItem) =>
                `${tooltipItem[0]?.label}`,
            color:  '#fff'
        },*/
        plugins: { //not displaying
            labels: {
                display: 'true',
                render: 'percentage',
                fontColor: '#fff',
                fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                precision: 0
            }
        }
    }
    return (
        <div style={{ width: props.width }}>
            <Pie
                height={props.height}
                width={props.width}
                data={data}
                options={options}
            />
        </div>
    )
}

export default SurveyResultChart;