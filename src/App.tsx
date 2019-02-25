import { FluentCustomizations } from "@uifabric/fluent-theme";
import { initializeIcons } from "@uifabric/icons";
import { Customizer } from "office-ui-fabric-react";
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/office-ui-fabric-react/dist/css/fabric.css";
import "./App.css";
import ClusterBuilder from "./ClusterBuilder";
import Layout from "./layout/Layout";
import ListSelector from "./ListSelector";
import MachineTypes from "./models/MachineTypes";

initializeIcons();

const App = () => (
    <Router>
        <Customizer {...FluentCustomizations}>
            <Layout title="Azure CycleCloud">
                <Route exact={true} path="/" component={Main}/>
                <Route path="/list" component={ListExample}/>
            </Layout>
        </Customizer>                        
    </Router>
)

const Main = () => (<>
    <h1>New Cluster</h1>
    <ClusterBuilder/>
</>);

const ListExample = () => {
    const [ selected, setSelected ] = React.useState(3);
    const items = MachineTypes;
    const labelRenderer = (item: any) => item.name;
    const detailRenderer = (item: any) =>
        `${item.type}, ${item.cores} cores, ${item.memory} GB RAM`;
    const onSelectionChanged = (index: number) => setSelected(index);
    return (<>
        <div>Selected value <b>{items[selected].name}</b></div>
        <ListSelector
            height={400}
            items={items}
            initialValue={items[selected]}
            labelRenderer={labelRenderer}
            detailRenderer={detailRenderer}
            onSelectionChanged={onSelectionChanged}
            filter={true}
        />
    </>);
}

export default App;
