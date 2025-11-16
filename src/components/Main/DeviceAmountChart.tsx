import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import { AppContextIn } from '../../Interface/InApp';
import { Chart } from 'primereact/chart';

function DeviceAmountChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [categories, setCategories] = useState<Array<string>>([])
    const [amounts, setAmounts] = useState<Array<number>>([])
    const [isChart, setIsChart] = useState(false)

    const context = useAppContext() as AppContextIn


    function getDatas(){
        let m: string[] = []
        let r: number[] = []
        context.devicesAmount.map(i => {
            m.push(i.category)
            r.push(i.amount)
        })
        setCategories(m)
        setAmounts(r)
    }

    function initChart(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: categories,
            datasets: [
                {
                    label: 'Categorias',
                    data: amounts,
                    fill: false,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                      ],
                      borderColor: [
                        'rgb(54, 162, 235)',
                      ],
                      borderWidth: 1
                },
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
        context.listDeviceAmount()
    }, [])
    useEffect(() => {
        getDatas()
    }, [context.devicesAmount])
    useEffect(() => {
        if(amounts.length > 0 && categories.length > 0){
            initChart()
        }
    },[amounts, categories])



  return (
    <div className="card flex f-jc-center" style={{width:"100%"}}>
                {
                    !isChart? (<div className="card">Cargando</div>) : (
                            <Chart type="bar" data={chartData} options={chartOptions} width='90%' height='500px'/>        
                    )
                }
            </div>
  )
}

export default DeviceAmountChart