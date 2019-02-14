import * as React from "react";

import { IconButton, Panel, PanelType } from "office-ui-fabric-react";

import { initializeIcons } from "@uifabric/icons";
initializeIcons();

import "./ClusterSection.css";


export interface IClusterSectionProps {
    name: string;
    value: string;
    details?: string[];
}

interface IClusterSectionState {
    showEditPanel: boolean;
}

export default class ClusterSection
extends React.Component<IClusterSectionProps, IClusterSectionState> {
    constructor(props: IClusterSectionProps) {
        super(props);
        this.state = { showEditPanel: false };
    }
    public render() {
        const { details } = this.props;
        return (
            <div className="ClusterSection ms-Grid-col ms-lg4">
                <h2 className="ClusterSection-label">{this.props.name}</h2>
                <div className="ClusterSection-content ms-bgColor-neutralLight">
                    <div className="ClusterSection-edit">
                        <IconButton
                            styles={{ root: { backgroundColor: "transparent" }}}
                            iconProps={{ iconName: "Edit" }}
                            aria-label="Edit cluster section"
                            onClick={this.showEditPanel}/>
                    </div>
                    <div className="ClusterSection-value">
                        {this.props.value}
                    </div>
                    {details && details.map(
                        (detail, i) => <div key={`detail-${i}`}
                            className="ClusterSection-detail">{detail}</div>)}
                </div>
                <Panel
                    isOpen={this.state.showEditPanel}
                    type={PanelType.smallFixedFar}
                    onDismiss={this.closeEditPanel}
                    headerText={`Edit ${this.props.name}`} />
            </div>
        );
    }

    private showEditPanel = () => this.setState({ showEditPanel: true });
    private closeEditPanel = () => this.setState({ showEditPanel: false });
}