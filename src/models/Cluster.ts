import MachineTypes from "./MachineTypes";
import Schedulers from "./Schedulers";
import Subnet from "./Subnet";

const Defaults = {
    nodeArrays: [
        { machineType: MachineTypes[1].name }
    ],
    nodes: [
        { machineType: MachineTypes[2].name }
    ],
    scheduler: Schedulers[0].id
}

export interface IClusterNode {
    machineType: string;
}

export enum ClusterNodeType {
    NODE = "NODE",
    NODE_ARRAY = "NODE_ARRAY"
}

export interface ISubnet {
    name: string;
}

export default class Cluster {
    public name: string;
    public category: string;
    public scheduler: string;
    public subnets: ISubnet[] = [];
}

export const createCluster = () => {
    const cluster = new Cluster();
    const subnet = new Subnet("");
    cluster.scheduler = Defaults.scheduler;
    Defaults.nodes.forEach(node => subnet.nodes.push(node));
    Defaults.nodeArrays.forEach(node => subnet.nodeArrays.push(node));
    cluster.subnets.push(subnet);
    return cluster;
}