import { FaGaugeSimple } from 'react-icons/fa6';
import SimpleCharts from './Chart/BarChart';
import BasicPie from './Chart/PieChart';
import styles from './index.module.css';
import BasicGauges from './Chart/Gauges';

export default function Dashboard() {
  return (
    <div className={styles.main}>
      <div className={styles.componentDiv}><SimpleCharts /></div>
      <div className={styles.componentDiv}><BasicPie /></div>
      <div className={styles.componentDiv}><BasicGauges /></div>
    </div>
  )
}
