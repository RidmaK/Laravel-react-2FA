import { PolarArea } from 'react-chartjs-2';
import 'chart.js/auto';

interface Props {
    data: any;
    loading: boolean;
}

export default function PolarAreaChart({ data, loading }: Props) {
    if (loading) {
        return <div className="loading">Loading ....</div>;
    }

    const incidentTypesCounts: { [key: string]: number } = data.reduce((acc: any, incident: any) => {
        acc[incident.type] = (acc[incident.type] || 0) + 1;
        return acc;
    }, {});

    const types = Object.keys(incidentTypesCounts);
    const counts = Object.values(incidentTypesCounts);

    const chartData = {
        labels: types,
        datasets: [
            {
                data: counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <PolarArea data={chartData} />;
}
