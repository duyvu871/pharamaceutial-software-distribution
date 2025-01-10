'use client'
import BodyEnd from "@component/Landing/BodyEnd";
import BodyFirst from "@component/Landing/BodyFirst";
import BodyFive from "@component/Landing/BodyFive";
import BodyFour from "@component/Landing/BodyFour";
import BodyNews from "@component/Landing/BodyNews";
import BodyThree from "@component/Landing/BodyThree";
import { HeaderMegaMenu } from "@component/Landing/ui/Header_with_mega_menu.tsx";
import { Box } from "@mantine/core";

export default function Home() {
	return (
		<Box>
			<HeaderMegaMenu></HeaderMegaMenu>
			<BodyFirst ></BodyFirst>
			{/* <BodyTow></BodyTow> */}
			<BodyThree></BodyThree>
			<BodyFour></BodyFour>
			<BodyFive></BodyFive>
			<BodyNews></BodyNews>
			<BodyEnd></BodyEnd>
		</Box>
	);
}