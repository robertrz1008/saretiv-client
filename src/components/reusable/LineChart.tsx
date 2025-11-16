import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useAppContext } from '../../context/AppContext';
import { AppContextIn } from '../../Interface/InApp';

export default function LineChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [months, setMonths] = useState<Array<string>>([])
    const [revenues, setRevenues] = useState<Array<number>>([])
    const [isChart, setIsChart] = useState(false)

    const context = useAppContext() as AppContextIn







    function getDatas(){
        let m: string[] = []
        let r: number[] = []
        context.revenues.map(i => {
            m.push(i.mes)
            r.push(i.ingresos)
        })
        setMonths(m)
        setRevenues(r)
    }

    function initChart(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: months,
            datasets: [
                {
                    label: 'Meses',
                    data: revenues,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.6
                },
                // {
                //     label: 'Second Dataset',
                //     data: [28, 48, 40, 19, 86, 27, 90],
                //     fill: false,
                //     borderColor: documentStyle.getPropertyValue('--pink-500'),
                //     tension: 0.4
                // }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                // y: {
                //     ticks: {
                //         color: textColorSecondary
                //     },
                //     grid: {
                //         color: surfaceBorder
                //     }
                // }
            }
        };
        setChartData(data);
        setChartOptions(options);
        setIsChart(true)
    }






    useEffect(() => {
        context.listRevenues()
    },[])

    useEffect(() => {
        getDatas()
    }, [context.revenues]);

    useEffect(() => {
        if(revenues.length > 0 && months.length > 0){
            initChart()
        }
    },[revenues, months])

    






    return (
        <div className="card flex f-jc-center" style={{width:"100%"}}>
            {
                !isChart? (<div className="card">Cargando</div>) : (
                        <Chart type="line" data={chartData} options={chartOptions} width='90%' height='500px'/>        
                )
            }
        </div>
    )
}
   