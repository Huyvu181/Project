import { useUser } from "../../lib/auth";
import { ContentLayout } from "../../components/layouts/content-layout";
import { useState, useEffect } from "react";
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
	const [user, setUser] = useState<{ firstname: string; lastname: string; email: string } | null>(null);

	useEffect(() => {
		const userData = localStorage.getItem('user');
		console.log('User Data from localStorage:', userData);

		if (userData) {
			try {
				const parsedUser = JSON.parse(userData);
				setUser(parsedUser);
			} catch (error) {
				console.error('Error parsing user data:', error);
			}
		} else {
			console.warn('No user data found in localStorage');
		}
	}, []);


	if (!user) {
		return (
			<div>
				<p>Loading...</p>
				<p>No user data </p>
			</div>
		)
	}

	return (
		<>
			<ContentLayout title="Profile" >
				<div className=" overflow-hidden bg-white shadow sm:rounded-lg" >
					<div className=" px-4 py-5 sm:px-6" id="Profile">
						<div className="flex flex-col">
							<h3 className="text-lg font-medium leading-6 text-gray-900">
								User Information
							</h3>

							<p className="mt-1 max-w-2xl text-sm text-gray-500">
								Personal details of the user.
							</p>
						</div>
					</div>

					<div className=" flex border-t border-gray-200 px-4 py-5 sm:p-0" id="InforProfile">
						<dl className="sm:divide-y sm:divide-gray-200">
							<Entry label="First Name" value={user.firstname} />
							<Entry label="Last Name" value={user.lastname} />
							<Entry label="Email Address" value={user.email} />
						</dl>
					</div>

				</div>

			</ContentLayout >
		</>
	)
}