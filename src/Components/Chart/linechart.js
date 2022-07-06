import React, { useState, useEffect } from 'react'
import { Chart, Line } from 'react-chartjs-2'
import './index.css'
import { Chart as chartjs } from 'chart.js/auto'
function LineChart () {
  return (
    <div className='container'>
      <div className='row Chart '>
        <Line
        className='col-sm-12'
          data={{
            labels: ["Jan","Feb","March","April","Jun"],
            datasets: [
              {
                label: 'URL CREATED PER MONTH',
                data: [2,4,5,3,5],
                backgroundColor: ['blue', 'red'],
                borderColor: 'black',
                pointStyle:"star",
                pointBackgroundColor:"green",
                normalized:true,
                tension:0.5,
                animation:true
              }
            ]
          }}
          width={700}
          height={300}
        ></Line>
      </div>
    </div>
  )
}

export default LineChart
