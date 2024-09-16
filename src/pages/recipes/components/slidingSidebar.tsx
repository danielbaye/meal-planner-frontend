import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import '../css/Sidebar.css'; // Custom CSS for the hover effect


const SlidingSidebar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleMouseEnter = () => setIsSidebarOpen(true);
    const handleMouseLeave = () => setIsSidebarOpen(false);

    return (
        <div
            className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isSidebarOpen &&
                <Tab.Container defaultActiveKey="tab1">
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="tab1">Tab 1</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tab2">Tab 2</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content className="p-3">
                        <Tab.Pane eventKey="tab1">
                            <h5>Tab 1 Content</h5>
                            <p>This is the content for Tab 1.</p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="tab2">
                            <h5>Tab 2 Content</h5>
                            <p>This is the content for Tab 2.</p>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>}
            {!isSidebarOpen && <i className="bi bi-chevron-double-right icon-white"></i>}
        </div>
    );
};

export default SlidingSidebar;
