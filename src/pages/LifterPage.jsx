import { useState } from "react";
import { useLifterRecords } from "../hooks/useLifterRecords";
import { LifterTable } from "../components/lifters/LifterTable";
import './styles/lifterpage.scss';


const LifterPage = () => {
    const [name, setName] =useState('');
    const [filters, setFilters] = useState({
        federation: '',
        weightClass: '',
        ageClass: '',
        event: '',
        equipment: '',
    });

    const headers = [];
    const headerNames = [];

    const { data, isLoading, error } = useLifterRecords(name, filters);

    const handleFilterChange = (e) => {
        setFilters(prev => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    return (
        <div className="page-container">
            
        </div>
    );
};

export default LifterPage;