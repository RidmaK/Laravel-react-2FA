import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface Props {
    data: any;
    loading: boolean;
}

export default function LineChart({ data, loading }: Props) {
    if (loading) {
        return <div className="loading">Loading ....</div>;
    }

    // Group incidents by month
    const incidentsByMonth = data.reduce((acc: any, incident: any) => {
        const month = new Date(incident.created_at).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    const months = Object.keys(incidentsByMonth);
    const counts = Object.values(incidentsByMonth);

    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Incidents by Month',
                data: counts,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return <Line data={chartData} />;
}
