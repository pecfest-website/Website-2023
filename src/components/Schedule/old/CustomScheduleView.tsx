import moment from "moment";
import React from "react";
import { NavigateAction, TimeGrid, TitleOptions } from "react-big-calendar";

interface MyWeekProps {
    date: Date;
}

class CustomWeek extends React.Component<MyWeekProps> {
    static title(date: Date, options: TitleOptions) {
        return `PECFEST`;
    }

    static navigate = (date: Date, action: NavigateAction, props: any) => {
        switch (action) {
            case "PREV":
                return moment(date).add(-7, "day").toDate();
            case "NEXT":
                return moment(date).add(7, "day").toDate();
            default:
                return date;
        }
    };

    static range = (date: Date) => {
        let start = moment(date).startOf("week").add(1, "day").toDate();
        let end = moment(date).endOf("week").add(1, "day").toDate();

        let current = start;
        let range = [];

        while (moment(current).isSameOrBefore(moment(end), "day")) {
            range.push(current);
            current = moment(current).add(1, "day").toDate();
        }

        return range;
    };

    render() {
        let { date } = this.props;
        let range = CustomWeek.range(date);

        return <TimeGrid {...this.props} range={range} eventOffset={15} />;
    }
}

export default CustomWeek;