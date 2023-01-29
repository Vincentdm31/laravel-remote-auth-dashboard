class RemoteAuthChart {
    static instance;

    constructor() {
        if (RemoteAuthChart.instance) {
            return RemoteAuthChart.instance;
        }

        RemoteAuthChart.instance = this;
        console.log('CONSTRUCTOR RemoteAuthChart')

        this.options = {
            series: [
                {
                    name: "Online",
                    data: []
                },
                {
                    name: "Forbidden",
                    data: []
                },
                {
                    name: "Offline",
                    data: []
                }
            ],
            chart: {
                height: 300,
                type: 'line',
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: true,
                    easing: 'easeinoutquad',
                    speed: 1500,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            tooltip: {
                enabled: true,
                theme: 'dark'
            },
            colors: ['#83ff64', '#ffc456', '#ff3333'],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Endpoints healthcheck',
                align: 'left'
            },
            grid: {
                borderColor: '#333333',
                row: {
                    colors: ['#333333', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.1
                },
            },
            yaxis: {
                title: {
                    text: 'Count'
                },
                min: 0,
                max: sites.length + 5,
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
        };

        this.chart = new ApexCharts(document.querySelector("#chart"), this.options);
        this.chart.render();
    }

    updateChart() {
        const newOnlineCats = [{ x: new Date().toLocaleTimeString(), y: sites.filter(s => s.status == 'online').length }]
        const newForbiddenCats = [{ x: new Date().toLocaleTimeString(), y: sites.filter(s => s.status == 'forbidden').length }]
        const newOfflineCats = [{ x: new Date().toLocaleTimeString(), y: sites.filter(s => s.status == 'offline').length }]

        if (this.chart.opts.series.find(s => s.name == 'Offline').data.length > 5) {
            this.chart.opts.series.find(s => s.name == 'Offline').data = this.chart.opts.series.find(s => s.name == 'Offline').data.slice(this.chart.opts.series.find(s => s.name == 'Offline').data.length - 5)
            this.chart.opts.series.find(s => s.name == 'Online').data = this.chart.opts.series.find(s => s.name == 'Online').data.slice(this.chart.opts.series.find(s => s.name == 'Online').data.length - 5)
            this.chart.opts.series.find(s => s.name == 'Forbidden').data = this.chart.opts.series.find(s => s.name == 'Forbidden').data.slice(this.chart.opts.series.find(s => s.name == 'Forbidden').data.length - 5)
        }

        this.chart.appendData([
            {
                name: "Online",
                data: newOnlineCats
            },
            {
                name: "Forbidden",
                data: newForbiddenCats
            },
            {
                name: "Offline",
                data: newOfflineCats
            }
        ],
        )
    }
}
export default RemoteAuthChart;