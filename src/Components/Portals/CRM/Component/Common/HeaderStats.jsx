import React from 'react'

function HeaderStats() {
	return (
		<>
			{/* Header */}
			<div className="relative bg-green-700 md:pt-32 pb-32 pt-12">
				<div className="px-4 md:px-10 mx-auto w-full">
					<div>
						{/* Card stats */}
						<div className="flex flex-wrap">
							<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
								<CardStats
									statSubtitle="POINTS"
									statTitle="350,897"
									statArrow="up"
									statPercent="3.48"
									statPercentColor="text-emerald-500"
									statDescripiron="Since last month"
									statIconName="far fa-chart-bar"
									statIconColor="bg-red-500"
								/>
							</div>
							<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
								<CardStats
									statSubtitle="PRODUCTS"
									statTitle="12"
									statArrow="down"
									statPercent="3.48"
									statPercentColor="text-red-500"
									statDescripiron="Since last week"
									statIconName="fas fa-chart-pie"
									statIconColor="bg-orange-500"
								/>
							</div>
							<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
								<CardStats
									statSubtitle="QR GENERATED"
									statTitle="924"
									statArrow="down"
									statPercent="1.10"
									statPercentColor="text-orange-500"
									statDescripiron="Since yesterday"
									statIconName="fas fa-users"
									statIconColor="bg-pink-500"
								/>
							</div>
							<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
								<CardStats
									statSubtitle="CUSTOMER REACH"
									statTitle="12,120"
									statArrow="up"
									statPercent="12"
									statPercentColor="text-emerald-500"
									statDescripiron="Since last month"
									statIconName="fas fa-percent"
									statIconColor="bg-blue-500"
								/>
							</div>
						</div>
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
									'text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ' +
									statIconColor
								}
							>
								<i className={statIconName}></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
