import { Layers } from "@/components/landing/util/layers";
import underwater from "../assets/underwater2.png";
import statisticsText from "../assets/statistics.png";

function Underwater() {
    // TODO : reponsive for mobile
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    return (
        <>
            {/* <Layers pos={[0, -190, -40]} args={[100, 50]} img={buildings.src} />
            <Layers pos={[0, -200, -40]} args={[150, 75]} img={hill3.src} />
            <Layers pos={[0, -200, -40]} args={[150, 75]} img={hill2.src} />
            <Layers pos={[0, -200, -40]} args={[150, 75]} img={hill1.src} /> */}

            <Layers pos={[0, -200, -40]} args={[150, 77]} img={underwater.src} /> 
            {sizes.width > 960 ? (
                <Layers
                    pos={[0, -175, -30]}
                    args={[96, 54]}
                    img={statisticsText.src}
                />
            ) : (
                <Layers
                    pos={[0, -200, -30]}
                    args={[48, 27]}
                    img={statisticsText.src}
                />
            )}
        </>
    );
}

export default Underwater;
