export type gameMetricType = {
    day: string;
    value: number;
    id: string;
    appId: string;
}

export type gameObjType = {
    createdAt: string;
    name: string;
    icon: string;
    active: boolean;
    id: string;
    installs: gameMetricType[];
    revenue: gameMetricType[];
}

export type campaignMetricType = {
    day: string;
    value: number;
}

export type campaignType = {
    id: string;
    name: string;
    installs: campaignMetricType[]
}