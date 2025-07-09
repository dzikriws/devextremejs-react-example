import React, {useEffect, useState} from 'react';
import { Button, Accordion } from 'devextreme-react';
import axios from 'axios';
import './home.scss';

export function Home() {

	const [data, setData] = useState<any[]>([])

	useEffect(() => {
		axios.get("https://jsonplaceholder.typicode.com/todos")
		.then((res) => {
			setData(res.data.slice(0, 10))
		})
		.catch((err) => {
			console.error("Gagal mengambil data:", err);
		});
	}, []);

	const handleClick = () => {
		alert('You clicked the button!');
	};

	return (
		<React.Fragment>
			<h2 className={'content-block'}>Home</h2>
			<div className={'content-block'}>
				<div className={'dx-card responsive-paddings'}>
					<p>Thanks for using the DevExtreme React App Template.</p>
					<p>
						<span>This application was built using </span>
						<a href={'https://vite.dev/guide/'} target={'_blank'} rel={'noopener noreferrer'}>create-vite</a>
						<span> and </span>
						<a href={'https://js.devexpress.com/Documentation/Guide/Common/DevExtreme_CLI/'} target={'_blank'} rel={'noopener noreferrer'}>DevExtreme CLI</a>
						<span> and includes the following DevExtreme components:</span>
					</p>
					<ul>
						<li><a href={'https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Getting_Started_with_DataGrid/'} target={'_blank'} rel={'noopener noreferrer'}>DataGrid</a></li>
						<li><a href={'https://js.devexpress.com/Documentation/Guide/Widgets/Form/Overview/'} target={'_blank'} rel={'noopener noreferrer'}>Form</a></li>
						<li><a href={'https://js.devexpress.com/Documentation/Guide/Widgets/Drawer/Getting_Started_with_Navigation_Drawer/'} target={'_blank'} rel={'noopener noreferrer'}>Drawer</a></li>
					</ul>

					<p>To customize your DevExtreme React application further, please refer to the following help topics:</p>

					<ul>
						<li><a href={'https://js.devexpress.com/Documentation/Guide/React_Components/Application_Template/#Layouts'} target={'_blank'} rel={'noopener noreferrer'}>Layouts</a></li>
						<li><a href={'https://js.devexpress.com/Documentation/Guide/React_Components/Application_Template/#Add_a_New_View'} target={'_blank'} rel={'noopener noreferrer'}>Add a New View</a></li>
						<li><a href={'https://js.devexpress.com/Documentation/Guide/React_Components/Application_Template/#Configure_the_Navigation_Menu'} target={'_blank'} rel={'noopener noreferrer'}>Configure the Navigation Menu</a></li>
						<li><a href={'https://js.devexpress.com/Documentation/Guide/React_Components/Application_Template/#Configure_Themes'} target={'_blank'} rel={'noopener noreferrer'}>Configure Themes</a></li>
					</ul>

					<p>
						<span>For technical content related to DevExtreme React components, feel free to explore our </span>
						<a href="https://js.devexpress.com/documentation/" target="_blank" rel="noopener noreferrer">online documentation</a>
						<span> and </span>
						<a href="https://js.devexpress.com/Demos/Widgetsgallery/" target="_blank" rel="noopener noreferrer">technical demos</a>.
					</p>
				</div>
			</div>
				<div className={'content-block'}>
					<div className={'dx-card responsive-paddings'}>
						<Button
							text='test'
					className='p-4 bg-white rounded-lg shadow'
						onClick={handleClick}
						/>

					<Accordion
						dataSource={data}
						collapsible={true}
						multiple={true}	
						animationDuration={200}
						itemTitleRender={(data) => <div className="font-semibold">{data.id}</div>}
						itemRender={(data) => <div className="text-sm text-gray-700">{data.title}</div>}
					/>
				</div>
			</div>
		</React.Fragment>
)}
