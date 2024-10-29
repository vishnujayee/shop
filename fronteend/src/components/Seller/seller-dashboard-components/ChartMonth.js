import React from 'react'
import {BarChart , CartesianGrid, XAxis, YAxis,Tooltip, Bar, Legend} from 'recharts'
export default function ChartMonth() {
    const data = [
        {
          "name": "jan",
          "uv": 4000,
          "pv": 2400
        },
        {
          "name": "feb",
          "uv": 3000,
          "pv": 1398
        },
        {
          "name": "Mar",
          "uv": 2000,
          "pv": 9800
        },
        {
          "name": "Apr",
          "uv": 2780,
          "pv": 3908
        },
        {
          "name": "May",
          "uv": 1890,
          "pv": 4800
        },
        {
          "name": "june",
          "uv": 1890,
          "pv": 4800
        },
        {
          "name": "july",
          "uv": 1890,
          "pv": 4800
        },
        {
          "name": "Aug",
          "uv": 1890,
          "pv": 4800
        },
        {
          "name": "Sep",
          "uv": 2390,
          "pv": 3800
        },
        {
          "name": "Oct",
          "uv": 3490,
          "pv": 4300
        },
          {
          "name": "Nov",
          "uv": 3490,
          "pv": 4300
        },
          {
          "name": "Dec",
          "uv": 3490,
          "pv": 4300
        }
      ]
  return (                           
    <BarChart width={500} height={250} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="pv" fill="#8884d8" />
    <Bar dataKey="uv" fill="#82ca9d" />
  </BarChart>
  )
}