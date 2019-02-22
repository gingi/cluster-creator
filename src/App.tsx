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
    const [ selected, setSelected ] = React.useState(6);
    const items = Array.from(Array(500).keys()).map(num => {
        return { label: `Value ${num}` }
    });


    const onSelectionChanged = (index: number) => setSelected(index);
    return (<>
        <div>Selected value <b>{items[selected].label}</b></div>
        <div style={{ height: 400, overflow: "scroll" }}>
            <ListSelector
                items={items}
                initialValue={items[selected]}
                onSelectionChanged={onSelectionChanged}
            />
        </div>
    </>);
}

export default App;
