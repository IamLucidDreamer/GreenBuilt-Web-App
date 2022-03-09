import { PageHeader } from 'antd'
import './HCLayout.css'

export const HCLayout = ({ children, actions = [], onBack, title }) => (
	// eslint-disable-next-line react/jsx-filename-extension
	<div className="pb-6 px-6">
		<div
			className="site-page-header-ghost-wrapper relative border-8 border-purple-1 rounded-2xl"
			style={{ padding: '0px', backgroundColor: '#F0F2F5' }}
		>
			<PageHeader
				ghost={false}
				onBack={onBack}
				title={title}
				style={{
					padding: '16px 16px',
					backgroundColor: '#140035',
					overflow: 'hidden',
					borderRadius: '6px 6px 0px 0px',
					color: '#fff',
				}}
				// subTitle="This is a subtitle"
				extra={actions}
			/>
			{children}
		</div>
	</div>
)
