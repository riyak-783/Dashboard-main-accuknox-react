import React, { useContext, useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { ReactProvider } from '../Context/ReactContent';
import { Breadcrumb } from 'antd';

const Navbar = () => {
   

    const [searchData, setSearchData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showList, setShowList] = useState(false)

    const { charts, pieCharts, radarCharts } = useContext(ReactProvider);

    const allItems = [...charts, ...pieCharts, ...radarCharts];

    useEffect(() => {
        setSearchData(allItems);
    }, [charts, pieCharts, radarCharts]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.length > 0) {
            setShowList(true)
            const filteredData = allItems.filter((data) => data.title.toLowerCase().includes(query));
            setSearchData(filteredData);
        } else {
            setShowList(false)
            setSearchData(allItems);
        }
    };

    return (
        <div className='position-fixed top-0 w-100' style={{ zIndex: "1000" }}>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Breadcrumb
                    className='custom-breadcrumb'
                        separator=">"
                        items={[
                        {
                            title: 'Home',
                            href: '',
                        },
                        {
                            title: 'DashBoard',
                        },
                        ]}
                    />
                    <form className="d-flex gap-2 position-relative bg-slate-200 hover">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={handleSearch}
                            value={searchQuery}
                        />
                        {showList && <div className='search_section col-12 col-md-6 col-lg-6'>
                            <ListGroup>
                                {searchData?.map((e, i) => (
                                    <ListGroup.Item key={i}>
                                        <span>{e.title}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>}
                    </form>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
