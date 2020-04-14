
// https://api.covid19api.com/

fetch("https://api.covid19api.com/dayone/country/turkey")
    .then(response => response.json())
    .then(data => {
        const dataArray = data;
        // extract the confirmed numbers to array
        const confirmedArray = dataArray.map((element) => {
            return (element.Confirmed);
        });

        var xAccessLine = 1;
        var arrayOfDailyConfirmedNumbers = [];
        const xArray = [];
        const yArray = [];
        // initial the first point at the graph
        xArray.push(confirmedArray[0]);
        yArray.push(0);

        //filter the cases to output the cases for each day
        for (let index = 0; index < confirmedArray.length; index++) {
            if (confirmedArray[index] !== confirmedArray[index - 1]) {
                arrayOfDailyConfirmedNumbers.push(confirmedArray[index] - confirmedArray[index - 1]);
            }
        }

        // loop to push data to the x and y axis
        for (let index = 0; index < arrayOfDailyConfirmedNumbers.length; index++) {
            if (arrayOfDailyConfirmedNumbers[index] > 0) {
                const element = arrayOfDailyConfirmedNumbers[index];
                xAccessLine = xAccessLine + element;
                xArray.push(xAccessLine);
                yArray.push(element);
            }
        }

        var apexYAxisValue = 10;
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
            xaxis: {
                categories: xArray,
                // labels: {
                //     show: true,
                //     align: 'right',
                //     minWidth: 0,
                //     maxWidth: 160,
                //     style: {
                //         colors: [],
                //         fontSize: '12px',
                //         fontFamily: 'Helvetica, Arial, sans-serif',
                //         fontWeight: 400,
                //         cssClass: 'apexcharts-yaxis-label',
                //     },
                //     offsetX: 0,
                //     offsetY: 0,
                //     rotate: 0,
                //     formatter: () => { 
                //         apexYAxisValue = apexYAxisValue * 10;
                //         return apexYAxisValue 
                //     },
                // },
            },
            // yaxis: {
            //     labels: {
            //         show: true,
            //         align: 'right',
            //         minWidth: 0,
            //         maxWidth: 160,
            //         style: {
            //             colors: [],
            //             fontSize: '12px',
            //             fontFamily: 'Helvetica, Arial, sans-serif',
            //             fontWeight: 400,
            //             cssClass: 'apexcharts-yaxis-label',
            //         },
            //         offsetX: 0,
            //         offsetY: 0,
            //         rotate: 0,
            //         formatter: () => { 
            //             apexYAxisValue = apexYAxisValue * 10;
            //             return apexYAxisValue 
            //         },
            //     },
            // },
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
        // add the chart to the html tag
        const chart = new ApexCharts(chartDiv, options);
        // render chart
        chart.render();
    });
