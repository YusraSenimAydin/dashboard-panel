import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, HistoryOutlined } from '@ant-design/icons';


const Sidebar = () => {
	return (
		<div className="bg-neutral-900 w-60 p-3 flex flex-col">
			<div className="flex items-center gap-2 px-1 py-3">
				<Menu.Item icon={<HomeOutlined />}>
					<Link to="/" className="flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base">
						<h2 className="text-2xl font-bold md:text-4xl">EMIN USTA</h2>
					</Link>
				</Menu.Item>
			</div>
			<div className="py-8 flex flex-1 flex-col gap-0.5">
				<Menu.Item key="2" icon={<ShoppingCartOutlined />}>
					<Link to="/orders">Siparişler</Link>
				</Menu.Item>
			</div>
			<div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
				<Menu.Item key="3" icon={<HistoryOutlined />}>
					<Link to="/past-orders">Geçmiş Siparişler</Link>
				</Menu.Item>
			</div>
		</div>
	)
}


export default Sidebar;