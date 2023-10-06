import React from "react";

import { fetchChannels, fetchEpg } from "../data/schedule";

import { useEpg } from "planby";
import { GetServerSidePropsContext } from "next";

// Import theme
import { theme } from "../data/schedule/theme";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { db } from "@/serverless/firebase";

export function useApp() {
    const [channels, setChannels] = React.useState<any>([]);
    const [epg, setEpg] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [day, setDay] = React.useState("0");
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
        isInitialScrollToNow: true,
        isCurrentTime: true,
        isLine: true,
        startDate: `2023-10-2${0 + Number(day)}T00:00:00`, //to be set according to the fest day
        endDate: `2023-10-2${0 + Number(day)}T24:00:00`,  //to be set according to the fest day
        isBaseTimeFormat: true,
        theme,
    });

    const handleFetchResources = React.useCallback(async () => {
        setIsLoading(true);
        const epg = await getServerSideProps();
        const channels = await fetchChannels();
        setEpg(epg);
        setChannels(channels);
        setIsLoading(false);
        console.log("events", await getServerSideProps());
    }, []);

    async function getServerSideProps() {
        let dayTemp = sessionStorage.getItem("day") || "0"
        setDay(dayTemp);

        const colRef = query(
            collection(db, "events"),
            where("day", "==", dayTemp)
        );

        const comps = await getDocs(colRef);

        const events = comps.docs.map((doc) => {
            return {
                id: doc.id,
                title: doc.data().name,
                since: doc.data().startDate,
                till: doc.data().endDate,
                image: "/FestPics/swords.png",
                channelUuid: doc.data().clubName,
                ...doc.data()
            };
        });



        return events;
    }

    React.useEffect(() => {
        handleFetchResources();
    }, [handleFetchResources]);

    return { getEpgProps, getLayoutProps, isLoading };
}
