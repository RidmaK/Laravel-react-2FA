import { PieChart } from '@mui/x-charts/PieChart';
import "./index.css";
interface Props {
    products: any;
    loading: boolean;
  }
export default function BasicPie({products, loading}: Props) {



    if(loading){
        return (
            <div className='loading'>Loading ....</div>
        )
    }

    const pieData = products.slice(0, 6).map((product: any) => ({
        id: product.id,
        value: product.quantity,
        label: product.name
    }));

    return (
        <PieChart
            series={[
                {
                    data: pieData,
                },
            ]}
            width={600}
            height={200}
        />
    );
}
