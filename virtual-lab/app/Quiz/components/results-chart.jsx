'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Text } from 'recharts'

export default function ResultsChart({ score, total }) {
  const data = [
    { name: 'Correct', value: score },
    { name: 'Incorrect', value: total - score },
  ]

  const COLORS = ['#4CAF50', '#F44336']

  // Custom label function to fix the position of the "Incorrect" text
  const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180
    const radius = outerRadius + 10 // Adjust label position slightly outside the pie
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    if (data[index].name === 'Incorrect') {
      // Fix "Incorrect" at a specific position
      return <Text x={cx} y={cy + 120} textAnchor="middle" fill="#F44336">{`${data[index].name} ${(percent * 100).toFixed(0)}%`}</Text>
    }

    // Dynamic positioning for other labels
    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${data[index].name} ${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label={renderCustomLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
