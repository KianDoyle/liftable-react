import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLifterRecords } from "../hooks/useLifterRecords";
import { Filters } from "../components/common/Filters";
import { LifterTable } from "../components/lifters/LifterTable";
import { Charts } from "../components/charts/Charts";
import './styles/lifterpage.scss';

const LifterPage = () => {
    const lifterName = window.location.pathname.split('/')[2];
    const [name, setName] = useState(decodeURIComponent(lifterName));
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [lifterRecords, setLifterRecords] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [filters, setFilters] = useState({
        federation: '',
        weightClass: '',
        ageClass: '',
        event: '',
        equipment: '',
    });

    const headers = ["name", "sex", "age", "birthYearClass", "bodyweightKg", "weightClassKg", "best3SquatKg", "best3BenchKg", "best3DeadliftKg", "totalKg", "goodlift", "federation", "date"];
    const headerNames = ["", "name", "sex", "age", "division", "weight", "class", "squat", "bench", "deadlift", "total", "glp", "fed", "date", ""];

    const { data, isLoading, error } = useLifterRecords(name, page, pageSize, filters);

    const observer = useRef();
    const lastLifterElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    const handleFilterChange = (e) => {
        setFilters(prev => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
        setPage(0);
        setLifterRecords([]);
        setHasMore(true);
    };

    useEffect(() => {
        if (data) {
            if (page === 0) {
                setLifterRecords(data.content);
            } else {
                setLifterRecords(prev => [...prev, ...data.content]);
            }
            setHasMore(!data.last);
        }
    }, [data, page]);

    return (
        <div className="page-container">
            <div className="table-controls">
                <Filters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />
            </div>
            <LifterTable
                headers={headers}
                headerNames={headerNames}
                entities={lifterRecords}
                loading={isLoading}
                error={error}
                lastLifterRef={lastLifterElementRef}
                tableHeight="40%"
            />
            <Charts
                entities={lifterRecords.reverse()}
                loading={isLoading}
                error={error}
            />
        </div>
    );
};

export default LifterPage;