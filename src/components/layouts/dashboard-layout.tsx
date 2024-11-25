import { Navbar } from "../../app/navbar/Navbar"
import { Home } from "../home/Home"
export function Dashboard() {
	return (
		<div>
			<div>
				<Navbar />
			</div>

			<div>
				<Home />
			</div>

			<div>
				Contact Us
			</div>

		</div>
	)
}

