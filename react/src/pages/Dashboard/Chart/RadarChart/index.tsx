import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';

interface Props {
    data: any;
    loading: boolean;
}

export default function RadarChart({ data, loading }: Props) {
    if (loading) {
        return <div className="loading">Loading ....</div>;
    }

    // Group incidents by severity
    const incidentSeverityCounts: { [key: string]: number } = data.reduce((acc: any, incident: any) => {
        acc[incident.severity] = (acc[incident.severity] || 0) + 1;
        return acc;
    }, {});

    const severities = Object.keys(incidentSeverityCounts);
    const counts = Object.values(incidentSeverityCounts);

    const chartData = {
        labels: severities,
        datasets: [
            {
                label: 'Incident Severity',
                data: counts,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
            },
        ],
    };

    return <Radar data={chartData} />;
}
