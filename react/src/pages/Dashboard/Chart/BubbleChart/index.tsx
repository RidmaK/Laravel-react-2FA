import { Bubble } from 'react-chartjs-2';
import 'chart.js/auto';

interface Props {
    data: any;
    loading: boolean;
}

export default function BubbleChart({ data, loading }: Props) {
    if (loading) {
        return <div className="loading">Loading ....</div>;
    }

    const chartData = {
        datasets: data.map((incident: any) => ({
            label: incident.type,
            data: [
                {
                    x: new Date(incident.created_at).getTime(),
                    y: incident.severity,
                    r: incident.impact,
                },
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        })),
    };

    return <Bubble data={chartData} />;
}
