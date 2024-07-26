import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

interface Props {
    data: any;
    loading: boolean;
}

export default function PieChart({ data, loading }: Props) {
    if (loading) {
        return <div className="loading">Loading ....</div>;
    }

    const incidentStatusCounts: { [key: string]: number } = data.reduce((acc: any, incident: any) => {
        acc[incident.status] = (acc[incident.status] || 0) + 1;
        return acc;
    }, {});

    const statuses = Object.keys(incidentStatusCounts);
    const counts = Object.values(incidentStatusCounts);

    const chartData = {
        labels: statuses,
        datasets: [
            {
                data: counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={chartData} />;
}
