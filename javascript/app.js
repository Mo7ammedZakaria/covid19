
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

        var apexYAxisValue = 1;
        addZero = (num) => {
            const valueArray = [1];
            for (let index = 0; index <= num; index++) {
                valueArray.push('0');
            }
            const removeComa = valueArray.join('');
            return removeComa.toString();
        }

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
                labels: {
                    show: true,
                    align: 'right',
                    minWidth: 0,
                    rotate: -45,
                    maxWidth: 160,
                    offsetX: 0,
                    offsetY: 0,
                    rotate: -45,
                    formatter: () => {
                        apexYAxisValue = apexYAxisValue * 10;
                        return apexYAxisValue
                    },
                },
            },
            yaxis: {
                tickPlacement: 'on',
                labels: {
                    show: true,
                    align: 'right',
                    minWidth: 0,
                    rotate: -45,
                    rotateAlways: true,
                    maxWidth: 160,
                    marginLeft: '40px',
                    style: {
                        colors: [],
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        cssClass: 'apexcharts-yaxis-label',
                    },
                    offsetX: 30,
                    offsetY: 0,
                    rotate: -45,
                    formatter: (index, array) => {
                        // console.log(array);
                        return (`${addZero(array)}`)
                    },
                },
            },
            grid: {
                // margin: {
                //     left: 40,
                //     right: 40
                // },
                padding: {
                    left: 40, // or whatever value that works
                    right: 50 // or whatever value that works
                }
            },
            plotOptions: {
                line: {
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
            },
            tooltip: {
                enabled: false,
            }
        };
        // init chart
        const chartDiv = document.querySelector("#chart");
        // add the chart to the html tag
        const chart = new ApexCharts(chartDiv, options);
        // render chart
        chart.render();
    });
