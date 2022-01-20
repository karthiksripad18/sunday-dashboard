import  { campaignType } from './redux/types';

// Generates a new campaign Object with provided name
export const getRamdomCampaignData = (campaignName: string, campaignLength: number): campaignType => {
    const installs: any = [];
    for (let i = 1; i <= 7; i++) {
        installs.push({
            day: `Day ${i}`,
            value: Math.floor(Math.random() * (99 - 0 + 1) + 0)
        });
    }
    return {
        name: campaignName,
        id: String(campaignLength + 1),
        installs
    }
}