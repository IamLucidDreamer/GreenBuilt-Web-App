import React from 'react'
import {
	TiPowerOutline,
	TiThSmallOutline,
	TiUserAdd,
	TiLocationArrow,
} from 'react-icons/ti'

function HeaderStats() {
	return (
		<>
			{/* Header */}

			<div>
				{/* Card stats */}
				<div className="flex flex-wrap">
					<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
						<CardStats
							statSubtitle="TOTAL GREEN UNITS"
							statTitle="950,897"
							statArrow="up"
							statPercent="3.48"
							statPercentColor="text-emerald-500"
							statDescripiron="Since last month"
							statIconName="TiPowerOutline"
						/>
					</div>
					<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
						<CardStats
							statSubtitle="INDUSTRY"
							statTitle="121"
							statArrow="down"
							statPercent="3.48"
							statPercentColor="text-red-500"
							statDescripiron="Since last week"
							statIconName="TiThSmallOutline"
						/>
					</div>
					<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
						<CardStats
							statSubtitle="END USERS"
							statTitle="90,356"
							statArrow="down"
							statPercent="1.10"
							statPercentColor="text-orange-500"
							statDescripiron="Since yesterday"
							statIconName="TiLocationArrow"
						/>
					</div>
					<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
						<CardStats
							statSubtitle="ANOTHER STAT"
							statTitle="9,902"
							statArrow="up"
							statPercent="12"
							statPercentColor="text-emerald-500"
							statDescripiron="Since last month"
							statIconName="TiUserAdd"
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default HeaderStats

function CardStats({
	statSubtitle,
	statTitle,
	statArrow,
	statPercent,
	statPercentColor,
	statDescripiron,
	statIconName,
	statIconColor,
}) {
	return (
		<>
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
				<div className="flex-auto p-4">
					<div className="flex flex-wrap">
						<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
							<h5 className="text-blueGray-400 uppercase font-bold text-xs">
								{statSubtitle}
							</h5>
							<span className="font-semibold text-xl text-blueGray-700">
								{statTitle}
							</span>
						</div>
						<div className="relative w-auto pl-4 flex-initial">
							<div
								className={
									'text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-gradient-to-br from-[#4bc834] to-[#1e6100]'
								}
							>
								{statIconName === 'TiPowerOutline' ? (
									<TiPowerOutline size={40} />
								) : null}
								{statIconName === 'TiThSmallOutline' ? (
									<TiThSmallOutline size={40} />
								) : null}
								{statIconName === 'TiLocationArrow' ? (
									<TiLocationArrow size={40} />
								) : null}
								{statIconName === 'TiUserAdd' ? <TiUserAdd size={40} /> : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
