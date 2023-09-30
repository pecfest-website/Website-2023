import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

export const HtmlTooltip = styled(({ className, color, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ color }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "transparent",
        maxWidth: "260px",
    },
    [`& .${tooltipClasses.arrow}`]: {
        color,
    },
}));
