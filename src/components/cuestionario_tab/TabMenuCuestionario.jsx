import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
import { Rubrica } from '../rubrica/Rubrica';
import { Item } from '../item/Item';
import { Indicador } from '../indicador/Indicador';

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
                    Tab para cuestionarios
                </Tab>
                <Tab eventKey="items" title="Items">
                    <Item />
                </Tab>
                <Tab eventKey="rubricas" title="Rubricas">
                    <Rubrica />
                </Tab>
                <Tab eventKey="indicadores" title="Indicadores">
                    <Indicador/>
                </Tab>
            </Tabs>
        </div>
    );
}