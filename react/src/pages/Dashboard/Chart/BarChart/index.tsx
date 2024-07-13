import { BarChart } from '@mui/x-charts/BarChart';
interface Props {
    products: any;
    loading: boolean;
  }
export default function SimpleCharts({products, loading}: Props) {
    // Extract product names and quantities
    const productNames = products.slice(0, 20).map((product: any) => product.name);
    const productQuantities = products.slice(0, 20).map((product: any) => product.quantity);

    if(loading){
        return (
            <div className='loading'>Loading ....</div>
        )
    }

  return (
    <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: productNames,
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: productQuantities,
        },
      ]}
      width={500}
      height={300}
    />
  );
}
