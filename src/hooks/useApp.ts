import React from "react";

import { fetchChannels, fetchEpg } from "../data/schedule";

import { useEpg } from "planby";

// Import theme
import { theme } from "../data/schedule/theme";

export function useApp() {
    const [channels, setChannels] = React.useState<any>([]);
    const [epg, setEpg] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const channelsData = React.useMemo(() => channels, [channels]);
    const epgData = React.useMemo(() => epg, [epg]);

    const { getEpgProps, getLayoutProps } = useEpg({
        channels: channelsData,
        epg: epgData,
        dayWidth: 7200,
        sidebarWidth: 100,
        itemHeight: 80,
        isSidebar: true,
        isTimeline: true,
        isLine: true,
        startDate: "2022-10-18T00:00:00",
        endDate: "2022-10-18T24:00:00",
        isBaseTimeFormat: true,
        theme,
    });

    const handleFetchResources = React.useCallback(async () => {
        setIsLoading(true);
        const epg = await fetchEpg();
        const channels = await fetchChannels();
        setEpg(epg);
        setChannels(channels);
        setIsLoading(false);
    }, []);

    React.useEffect(() => {
        handleFetchResources();
    }, [handleFetchResources]);

    return { getEpgProps, getLayoutProps, isLoading };
}