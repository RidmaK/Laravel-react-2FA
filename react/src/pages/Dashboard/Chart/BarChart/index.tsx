import { BarChart } from '@mui/x-charts/BarChart';
interface Props {
    data: any;
    loading: boolean;
}

export default function SimpleCharts({ data, loading }: Props) {
    // Extract incident types and their counts
    const incidentTypeCounts: { [key: string]: number } = data.reduce((acc: any, incident: any) => {
        acc[incident.type] = (acc[incident.type] || 0) + 1;
        return acc;
    }, {});

    const incidentTypes = Object.keys(incidentTypeCounts);
    const incidentCounts = Object.values(incidentTypeCounts);

    if (loading) {
        return (
            <div className='loading'>Loading ....</div>
        );
    }

    return (
        <BarChart
            xAxis={[
                {
                    id: 'barCategories',
                    data: incidentTypes,
                    scaleType: 'band',
                },
            ]}
            series={[
                {
                    data: incidentCounts,
                },
            ]}
            width={500}
            height={300}
        />
    );
}
