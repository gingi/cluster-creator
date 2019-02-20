import MachineTypes from "./MachineTypes";
import Schedulers from "./Schedulers";

const Defaults = {
    defaultComputNodes: [
        { machineType: MachineTypes[1].name }
    ],
    defaultHeadNodes: [
        { machineType: MachineTypes[2].name }
    ],
    defaultScheduler: Schedulers[0].id
}

export interface IClusterNode {
    machineType: string;
}

export enum ClusterNodeType {
    HEAD, COMPUTE
}

export default class Cluster {
    public name: string;
    public category: string;
    public scheduler: string;
    public headNodes: IClusterNode[];
    public computeNodes: IClusterNode[];

    constructor() {
        this.scheduler = Defaults.defaultScheduler;
        this.headNodes = Defaults.defaultHeadNodes;
        this.computeNodes = Defaults.defaultComputNodes;
    }
}
