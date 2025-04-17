import { 
    Chart, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Charts = () => {
    const [data, setData] = useState({});
    const [chartFilters, setChartFilters] = useState({
        federation: '',
        weightClass: '',
        ageClass: '',
        event: 'SBD',
        equipment: 'Single-ply',
    });

    return (
        <div></div>
    );
};

export default Charts;