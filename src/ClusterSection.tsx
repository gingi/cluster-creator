import { IconButton } from "office-ui-fabric-react";
import * as React from "react";
import ClusterParameter, { IClusterParameterProps } from "./ClusterParameter";
import "./ClusterSection.css";
import createEditor from "./ClusterSectionEditor";
import Cluster, { IClusterNode } from "./models/Cluster";
import MachineTypes from "./models/MachineTypes";
import Schedulers from "./models/Schedulers";


export enum ClusterSectionType {
    SCHEDULER = "Scheduler",
    NODE = "Node",
    NODE_ARRAY = "Node Array"
}

export interface IClusterSectionProps {
    cluster: Cluster;
    type: ClusterSectionType;
    details?: string[];
    onEdit: (values: any, ...args: any) => void;
    onAdd?: (values: any) => void;
    editor?: any;
    multiple?: false;
    parameters: [];
}

function getSectionHelper(props: IClusterSectionProps): SectionHelper<any> {
    let section: SectionHelper<any>;
    switch (props.type) {
        case ClusterSectionType.SCHEDULER:
            section = new SchedulerSectionHelper(props);
            break;
        case ClusterSectionType.NODE:
            section = new NodeSectionHelper(props, "TVMonitor");
            break;
        case ClusterSectionType.NODE_ARRAY:
            section = new NodeSectionHelper(props, "Stack");
            break;
        default:
            throw new Error(`No such section type ${props.type}`);
    }
    return section;
}

function makeParameterProps(parameter: any, helper: SectionHelper<any>):
IClusterParameterProps {
    return {
        Editor: helper.editor(),
        details: helper.details(parameter),
        icon: helper.icon(),
        label: helper.label(parameter),
        name: helper.name(),
        value: parameter
    };
}

export default function ClusterSection(props: IClusterSectionProps) {
    const { multiple = false } = props;
    const [ showEditor, setShowEditor ] = React.useState(false);
    const helper: SectionHelper<any> = getSectionHelper(props);
    const parameterProps = props.parameters.map(
        parameter => makeParameterProps(parameter, helper)
    );

    const addParameter = () => {
        if (props.onAdd) {
            props.onAdd(helper.createParameter(""));
            setShowEditor(true);
        }
    }

    const indexedParameterEditor = (index: number) => {
        return (value: any) => props.onEdit(value, index);
    }

    const showEditorForParameter = (i: number) => {
        return showEditor && i === parameterProps.length - 1;
    }

    let sectionLabel = helper.name();
    if (multiple) {
        sectionLabel += "s";
    }

    return (
        <div className="ClusterSection">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12">
                    <h2 className="ClusterSection-label">{sectionLabel}</h2>
                </div>
            </div>
            <div className="ms-Grid-row">
                {parameterProps.map((parameter, i) =>
                    <ClusterParameter
                        key={`parameter-${i}`}
                        {...parameter}
                        onEdit={indexedParameterEditor(i)}
                        showEditor={showEditorForParameter(i)}
                    />
                )}
                { multiple &&
                    <div className="ClusterSection-addParameter ms-Grid-col ms-lg1 ms-md1 ms-sm1">
                        <IconButton
                            iconProps={{ iconName: "CircleAddition" }}
                            onClick={addParameter}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

abstract class SectionHelper<T> {
    protected props: IClusterSectionProps;
    protected sectionEditor: any;
    constructor(props: IClusterSectionProps) {
        this.props = props;
        this.sectionEditor = createEditor(props.editor);
    }
    public details(value: T): string[] { return []; }
    public label(value: T): T { return value; }
    public editor() { return this.sectionEditor; }
    public abstract name(): string;
    public icon(): string | undefined { return undefined; }
    public createParameter(...args: any): T { return args[0]; }
}

// tslint:disable-next-line: max-classes-per-file
class SchedulerSectionHelper extends SectionHelper<string> {
    private static findScheduler(id: string) {
        return Schedulers.filter(s => s.id === id)[0];
    }
    public name() {
        return "Scheduler";
    }
    public details(id: string): string[] {
        const scheduler = SchedulerSectionHelper.findScheduler(id);
        if (scheduler) {
            return [ scheduler.label, `Version ${scheduler.version}` ];
        } else {
            return [];
        }
    }
    public label(id: string) {
        const scheduler = SchedulerSectionHelper.findScheduler(id);
        if (scheduler) {
            return scheduler.name;
        }
        return id;
    }
}

// tslint:disable-next-line: max-classes-per-file
class NodeSectionHelper extends SectionHelper<IClusterNode> {
    private static findMachineType(name: string): any {
        return MachineTypes.filter(mt => mt.name === name)[0];
    }
    private sectionName: string;
    private sectionIcon: string;
    constructor(props: IClusterSectionProps, icon: string) {
        super(props);
        this.sectionName = props.type;
        this.sectionIcon = icon;
    }
    public name() { return this.sectionName; }
    public label(node: any) { return node.machineType };
    public details(node: any): string[] {
        const machineType = NodeSectionHelper.findMachineType(node.machineType);
        if (!machineType) {
            return [];
        }
        return [ `${machineType.cores} vCPUs`, `${machineType.memory} GB RAM` ];
    }
    public icon(): string | undefined { return this.sectionIcon; }
    public createParameter(machineType: string): IClusterNode {
        const obj = { machineType };
        return obj;
    }
}