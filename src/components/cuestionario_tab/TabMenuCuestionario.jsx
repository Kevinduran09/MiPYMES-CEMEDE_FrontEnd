import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
import { Rubrica } from '../rubrica/Rubrica';
import { Item } from '../item/Item';
import { Indicador } from '../indicador/Indicador';
import { Cuestionario } from '../cuestionario/Cuestionario';

export const TabMenuCuestionario = () => {
    const [key, setKey] = useState('cuestionarios');

    return (
        <div className='container-fluid'>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mt-3 mb-3"
                style={{fontSize: "18px"}}
            >
                <Tab eventKey="cuestionarios" title="Cuestionario" className=''>
                    <Cuestionario />
                </Tab>
            </Tabs>
        </div>
    );
}