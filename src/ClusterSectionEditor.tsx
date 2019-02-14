import * as React from "react";

import { Panel, PanelType } from "office-ui-fabric-react";

export interface IClusterSectionEditorProps {
    isOpen: boolean;
    onDismiss: (event: React.SyntheticEvent<HTMLElement>) => void;
    headerText: string;
}

export default class ClusterSectionEditor
extends React.Component<IClusterSectionEditorProps, {}> {
    public render() {
        return (
            <Panel
                isOpen={this.props.isOpen}
                type={PanelType.smallFixedFar}
                onDismiss={this.props.onDismiss}
                headerText={this.props.headerText} />
        );
    }
}
