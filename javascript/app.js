
// https://api.covid19api.com/



//  fetch('https://api.covid19api.com/dayone/country/turkey') .then(response => response.json()).then(data =>{
// console.log(data);
// });

fetch("https://api.covid19api.com/dayone/country/turkey")
    .then(response => response.json())
    .then(data => {
        const dataArray = data;
        console.log(data);
        const confirmedArray = dataArray.map((element) => {
            return (element.Confirmed);
        });

        var xAccessLine = 1;
        // console.log();
        var arrayOfDailyConfirmedNumbers = [];
        const xArray = [];
        const yArray = [];
        for (let index = 0; index < confirmedArray.length; index++) {
            if (confirmedArray[index] !== confirmedArray[index - 1]) {
                arrayOfDailyConfirmedNumbers.push(confirmedArray[index] - confirmedArray[index - 1]);
            }
        }


        for (let index = 0; index < arrayOfDailyConfirmedNumbers.length; index++) {
            if (arrayOfDailyConfirmedNumbers[index] > 0) {
                const element = arrayOfDailyConfirmedNumbers[index];
                xAccessLine = xAccessLine;
                xArray.push(xAccessLine);
                yArray.push(element);
            }
        }

        const array = [1, 4, 187, 167, 311, 566];

        const options = {
            chart: {
                height: 450,
                width: '100%',
                type: 'line',
                background: '#f4f4f4',
                foreColor: '#333'
            },
            series: [
                {
                    name: 'confirmed cases',
                    data: yArray,
                },
            ],
            yaxis: {
                show: true,
                showAlways: true,
                showForNullSeries: true,
                seriesName: undefined,
                opposite: false,
                reversed: false,
                logarithmic: false,
                tickAmount: 6,
                min: 6,
                max: 6,
                forceNiceScale: false,
                floating: false,
                decimalsInFloat: undefined,
                labels: {
                    show: true,
                    align: 'right',
                    minWidth: 0,
                    maxWidth: 160,
                    style: {
                        colors: [],
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        cssClass: 'apexcharts-yaxis-label',
                    },
                    offsetX: 0,
                    offsetY: 0,
                    rotate: 0,
                    formatter: (value) => { return val },
                },
                axisTicks: {
                    show: true,
                    borderType: 'solid',
                    color: '#78909C',
                    width: 6,
                    offsetX: 0,
                    offsetY: 0
                },
                title: {
                    text: yArray,
                    rotate: -90,
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: 'white',
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                tooltip: {
                    enabled: true,
                    offsetX: 0,
                },
                
            },
            xaxis: {
                categories: xArray
            },
            plotOptions: {
                bar: {
                    horizontal: false
                }
            },
            fill: {
                // fontFamily: 'Helvetica, Arial, sans-serif',
                colors: ['#f44336']
            },
            dataLabels: {
                enabled: true
            },
            title: {
                text: 'Covid 19 Around The World Highest Countries Confirmed Cases',
                align: 'center',
                margin: 20,
                offsetY: 20,
                style: {
                    fontSize: '16px',
                }
            }
        };
        // init chart
        const chartDiv = document.querySelector("#chart");
        // console.log(chartDiv);
        const chart = new ApexCharts(document.querySelector("#chart"), options);
        // render chart
        // console.log(chart);
        chart.render();
    });
