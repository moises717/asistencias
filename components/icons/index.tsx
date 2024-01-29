export function IconExcel(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} viewBox='0 0 384 512'>
			<path d='M16 448V64c0-26.5 21.5-48 48-48H204.1c1.3 0 2.6 .1 3.9 .2V136c0 22.1 17.9 40 40 40H367.8c.2 1.3 .2 2.6 .2 3.9V448c0 26.5-21.5 48-48 48H64c-26.5 0-48-21.5-48-48zM358.6 157.3c.9 .9 1.7 1.8 2.4 2.7H248c-13.3 0-24-10.7-24-24V22.9c1 .8 1.9 1.6 2.7 2.4L358.6 157.3zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V179.9c0-12.7-5.1-24.9-14.1-33.9L238.1 14.1c-9-9-21.2-14.1-33.9-14.1H64zm70.7 227.6c-2.5-3.7-7.4-4.7-11.1-2.2s-4.7 7.4-2.2 11.1l61 91.6-61 91.6c-2.5 3.7-1.5 8.6 2.2 11.1s8.6 1.5 11.1-2.2l57.3-86 57.3 86c2.5 3.7 7.4 4.7 11.1 2.2s4.7-7.4 2.2-11.1l-61-91.6 61-91.6c2.5-3.7 1.5-8.6-2.2-11.1s-8.6-1.5-11.1 2.2l-57.3 86-57.3-86z' />
		</svg>
	);
}
export function IconFile(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='lucide lucide-file'
		>
			<path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' />
			<path d='M14 2v4a2 2 0 0 0 2 2h4' />
		</svg>
	);
}
export function IconLogout(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='lucide lucide-log-out'
		>
			<path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
			<polyline points='16 17 21 12 16 7' />
			<line x1='21' x2='9' y1='12' y2='12' />
		</svg>
	);
}
