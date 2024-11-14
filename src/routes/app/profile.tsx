import { useUser } from "../../lib/auth";
import { ContentLayout } from "../../components/layouts/content-layout";
type EntryProps = {
	label: string;
	value: string;
};

const Entry = ({ label, value }: EntryProps) => {
	return (
		<div className="py-4 sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
			<dt className="text-sm font-medium text-gray-500">{label}</dt>
			<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{value}</dd>
		</div>
	)
}

export const ProfileRoute = () => {
	const user = useUser()
	const displayUser: { email: string, firstname: string } = {
		email: "test@example.com",
		firstname: "John Doe"
	};

	if (!user && !user?.data) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<ContentLayout title="Profile" >
				<div className="overflow-hidden bg-white shadow sm:rounded-lg" >
					<div className="px-4 py-5 sm:px-6" id="Profile">
						<div className="flex flex-col">
							<h3 className="text-lg font-medium leading-6 text-gray-900">
								User Information
							</h3>

							<p className="mt-1 max-w-2xl text-sm text-gray-500">
								Personal details of the user.
							</p>
						</div>
					</div>

					<div className="border-t border-gray-200 px-4 py-5 sm:p-0" id="InforProfile">
						<dl className="sm:divide-y sm:divide-gray-200">
							<Entry label="First Name" value={displayUser.firstname} />
							<Entry label="Email Address" value={displayUser.email} />
						</dl>
					</div>

				</div>

			</ContentLayout >
		</>
	)
}