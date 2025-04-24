import React, { useState, useEffect } from 'react';
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
import { Line } from 'react-chartjs-2';
import './styles/charts.scss'
import { data } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const Charts = ({ entities, loading, error }) => {
    // Always call your hooks at the top.
    const [charts, setCharts] = useState([]);
    const [activeChart1Index, setActiveChart1Index] = useState(0);
    const [activeChart2Index, setActiveChart2Index] = useState(0);

    // Helper function: filters and builds an object with arrays for each field.
    function getChartData(records, eventType, equipType, fieldKeys = []) {
        const filteredData = records.filter(
            row => row.event.includes(eventType) && row.equipment === equipType
        );
        return Object.fromEntries(
            fieldKeys.map(key => [key, filteredData.map(row => row[key])])
        );
    }

    // Helper function: creates the configuration for a Chart.js line chart.
    function createChart(dataPoints, labels, title, label, borderColour, backgroundColour) {
        return {
            options: {
                spanGaps: true,
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: {
                            color: 'white'
                        },
                        title: {
                            display: true,
                            text: 'DATES',
                            color: 'white'
                        }
                    },
                    y: {
                        ticks: {
                            color: 'white'
                        },
                        title: {
                            display: true,
                            text: label,
                            color: 'white'
                        },
                        beginAtZero: false
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        color: 'white',
                        font: {
                            size: 14
                        }
                    },
                    legend: {
                        labels: {
                            color: 'white'
                        },
                        position: 'top'
                    },
                    tooltip: {
                        backgroundColor: 'black',
                        titleColor: 'white',
                        bodyColor: 'white',
                        mode: 'index',
                        intersect: true
                    }
                }
            },
            data: {
                // Chart.js expects the x-axis labels property name to be 'labels'
                labels,
                datasets: [
                    {
                        label: label,
                        data: dataPoints,
                        borderColor: borderColour,
                        backgroundColor: backgroundColour,
                        borderWidth: 2,
                        pointStyle: 'false'
                    }
                ]
            }
        };
    }

    // Always call hooks (like useEffect) unconditionally.
    useEffect(() => {
        if (!loading && !error && entities && entities.length) {
            const dataFPRaw = getChartData(
                entities,
                'SBD',
                'Raw',
                ['bodyweightKg', 'best3SquatKg', 'best3DeadliftKg', 'totalKg', 'goodlift', 'date']
            );
            const dataBRaw = getChartData(
                entities,
                'B',
                'Raw',
                ['best3BenchKg', 'date']
            );

            const newCharts = [
                createChart(
                    dataFPRaw.best3SquatKg,
                    dataFPRaw.date,
                    'RAW SQUAT PROGRESSION OVER TIME',
                    'SQUAT',
                    '#28b034',
                    '#ffffff'
                ),
                createChart(
                    dataBRaw.best3BenchKg,
                    dataBRaw.date,
                    'RAW BENCH PROGRESSION OVER TIME',
                    'BENCH',
                    '#28b034',
                    '#ffffff'
                ),
                createChart(
                    dataFPRaw.best3DeadliftKg,
                    dataFPRaw.date,
                    'RAW DEADLIFT PROGRESSION OVER TIME',
                    'DEADLIFT',
                    '#28b034',
                    '#ffffff'
                ),
                createChart(
                    dataFPRaw.totalKg,
                    dataFPRaw.date,
                    'RAW TOTAL PROGRESSION OVER TIME',
                    'TOTAL',
                    '#28b034',
                    '#ffffff'
                ),
                createChart(
                    dataFPRaw.goodlift,
                    dataFPRaw.date,
                    'RAW SBD GLP PROGRESSION OVER TIME',
                    'GLP',
                    '#28b034',
                    '#ffffff'
                ),
                createChart(
                    dataFPRaw.bodyweightKg,
                    dataFPRaw.date, 
                    'RAW BW PROGRESSION OVER TIME',
                    'BW',
                    '#28b034',
                    '#ffffff'
                )
            ];
            setCharts(newCharts);
            setActiveChart1Index(0);
            setActiveChart2Index(0);
        } else {
            // Optional: clear charts if no data / error.
            setCharts([]);
        }
    }, [entities, loading, error]);

    // Now that all hooks have been called, do your conditional rendering.
    if (error) {
        return <div className="error-message">{error}</div>;
    }
    if (entities.length === 0 && !loading) {
        return <div className="no-data-message">No entities found</div>;
    }

    return (
        <div className="charts-container">
            <div className="dynamic-charts" style={{ width: '45%' }}>
                <div className="chart-tabs" style={{ display: 'flex', width: '100%' }}>
                    {charts.slice(0, -3).map((chart, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveChart1Index(index)}
                            style={{
                                padding: '5px',
                                backgroundColor: activeChart1Index === index ? '#123456' : '#ccc',
                                color: activeChart1Index === index ? '#fff' : '#000',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {chart.options.plugins.title.text}
                        </button>
                    ))}
                </div>
                <div className="chart-wrapper" style={{ width: '100%', height: '90%' }}>
                    {charts.length > 0 && (
                        <Line
                            options={charts[activeChart1Index].options}
                            data={charts[activeChart1Index].data}
                        />
                    )}
                </div>
            </div>

            <div className="dynamic-charts" style={{ width: '45%' }}>
                <div className="chart-tabs" style={{ display: 'flex', width: '100%' }}>
                    {charts.slice(-3).map((chart, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveChart2Index(index)}
                            style={{
                                padding: '5px',
                                backgroundColor: activeChart2Index === index ? '#123456' : '#ccc',
                                color: activeChart2Index === index ? '#fff' : '#000',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {chart.options.plugins.title.text}
                        </button>
                    ))}
                </div>
                <div className="chart-wrapper" style={{ width: '100%', height: '90%' }}>
                    {charts.length > 0 && (
                        <Line
                            options={charts.slice(-3)[activeChart2Index].options}
                            data={charts.slice(-3)[activeChart2Index].data}
                        />
                    )}
                </div>
            </div>
        </div>

    );
};
