import { IconButton } from "office-ui-fabric-react";
import * as React from "react";
import { Component } from "react";
import "./ClusterSection.css";
import ClusterSectionEditor from "./ClusterSectionEditor";
import Schedulers from "./models/Schedulers";
import SchedulerSelector from "./SchedulerSelector";


export enum ClusterSectionType {
    SCHEDULER = "Scheduler",
    HEAD_NODE = "Head Node",
    COMPUTE_NODE = "Compute Node"
}

export interface IClusterSectionProps {
    type: ClusterSectionType;
    value: any;
    details?: string[];
}

interface IClusterSectionState {
    showEditPanel: boolean;
}

interface ISectionConfig {
    name?: string;
    valueRenderer?: (value: any) => string;
    detailRenderer?: (value: any) => string[];
    Editor?: any;
}

function findScheduler(name: string) {
    return Schedulers.filter(s => s.name === name)[0];
}

function getSectionForType(type: ClusterSectionType): ISectionConfig {
    const section: ISectionConfig = {};
    switch (type) {
        case ClusterSectionType.SCHEDULER:
            section.name = "Scheduler";
            section.detailRenderer = (name: string) => {
                const scheduler = findScheduler(name);
                return [ scheduler.label, `Version ${scheduler.version}` ];
            }
            break;
        case ClusterSectionType.HEAD_NODE:
            section.name = "Head Node";
            section.valueRenderer = (node: any) => node.machineType;
            break;
        case ClusterSectionType.COMPUTE_NODE:
            section.name = "Head Node";
            section.valueRenderer = (node: any) => node.machineType;
            break;
        default:
            section.name = "Undefined";
    }
    section.Editor = ClusterSectionEditor(SchedulerSelector);
    return section;
}

export default class ClusterSection
extends Component<IClusterSectionProps, IClusterSectionState> {
    private config: ISectionConfig;
    constructor(props: IClusterSectionProps) {
        super(props);
        this.config = getSectionForType(props.type);
        this.state = {
            showEditPanel: false
        };
    }
    public render() {
        const details = this.getSectionDetails();
        return (
            <div className="ClusterSection ms-Grid-col ms-lg4 ms-md6 ms-sm12">
                <h2 className="ClusterSection-label">{this.config.name}</h2>
                <div className="ClusterSection-content ms-bgColor-neutralLight">
                    <div className="ClusterSection-edit">
                        <IconButton
                            styles={{ root: { backgroundColor: "transparent" }}}
                            iconProps={{ iconName: "Edit" }}
                            aria-label="Edit cluster section"
                            onClick={this.showEditPanel}/>
                    </div>
                    <div className="ClusterSection-value">
                        {this.renderValue(this.props.value)}
                    </div>
                    {details && details.map(
                        (detail, i) => <div key={`detail-${i}`}
                            className="ClusterSection-detail">{detail}</div>)}
                </div>
                <this.config.Editor
                    isOpen={this.state.showEditPanel}
                    onDismiss={this.closeEditPanel}
                    onSave={this.saveAndCloseEditPanel}
                    headerText={`Edit ${this.config.name}`}
                />
            </div>
        );
    }

    private showEditPanel = () => this.setState({ showEditPanel: true });
    private closeEditPanel = () => this.setState({ showEditPanel: false });
    private saveAndCloseEditPanel = () => {
        this.closeEditPanel();
    };

    private renderValue(value: any) {
        if (this.config.valueRenderer) {
            return this.config.valueRenderer(value);
        }
        return value;
    }

    private getSectionDetails() {
        if (this.props.details) {
            return this.props.details;
        }
        if (this.config.detailRenderer) {
            return this.config.detailRenderer(this.props.value);
        }
        return null;
    }
}