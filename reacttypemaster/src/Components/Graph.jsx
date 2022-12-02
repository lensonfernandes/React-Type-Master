import React from 'react'
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useTheme } from '../Context/ThemeContext';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default function Graph({graphData, type}) {


    const  {theme} = useTheme();


  return (
    <div>
        <Line

            data={
                {
                    labels: graphData.map(i =>(type==='date')? (i[0].toDate().toLocaleString()) : (i[0]+1)),
                    datasets: [
                        {
                            data: graphData.map(i => i[1]),
                            label: 'WPM',
                            borderColor: theme.title
                        }
                    ]
                }
            }
        >

        </Line>
    </div>
  )
}
