import { Box, Card, Grid, Tab, Tabs } from "@mui/material";
import pic1 from "../../../images/undraw_Shopping_re_hdd9.png";
import { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";
import { ShoppingBag } from "@mui/icons-material";

function TabPannel(props) {
	let { children, value, index } = props
	return (
		<div role="tabpanel" hidden={value !== index}>
			{value === 0 &&<Box>{children}</Box>}
			{value === 1 &&<Box>{children}</Box>}
		</div>
	)
}


const Loginreg = () => {
	const [value, setValue] = useState(0)

	function handlechange(e,newvalue) {
		setValue(newvalue)
	}

	return (
		<>
			<Grid container height={'85vh'}>
				<Grid sx={{ backgroundImage: `url(${pic1})`, backgroundSize: "cover", backgroundPosition: "center" }} item lg={7} sm={5}>
				</Grid>
				<Grid item lg={5} sm={7}>
					<Card sx={{ width: '100%', height: '100%' }}>
						<Box margin={2}>
							<Box borderBottom={2} borderColor={'goldenrod'}>
								<Tabs value={value} textColor="primary" indicatorColor="secondary" onChange={handlechange}>
									<Tab label='Login' sx={{ textTransform: 'none', fontWeight: 'bold' }} />
									<Tab label='Registration' sx={{ textTransform: 'none', fontWeight: 'bold' }} />
								</Tabs>
							</Box>
							<TabPannel value={value} index={0}><Login/></TabPannel> 	{/* component made by me */}
							<TabPannel value={value} index={1}><Registration/></TabPannel> 	{/* component made by me */}
						</Box>
						<Box>
							<ShoppingBag/> {/* just an icon */}
						</Box>
					</Card>
				</Grid>
			</Grid>
		</>
	)
};






export default Loginreg;
