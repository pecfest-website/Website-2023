import { Layers } from "@/components/landing/util/layers";
import hill3 from "../assets/underwater/hill last.png";
import hill2 from "../assets/underwater/hill middle.png";
import hill1 from "../assets/underwater/hill front.png";
import buildings from "../assets/underwater/buildings.png";
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

            {sizes.width > 960 ? (
                <Layers
                    pos={[0, -170, -30]}
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
