/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './orderitem.css'
interface IOrderItem {
	list: {
		info: {
			id: number,
			order_date: string,
			delivery_address: string,
			delivery_date: string,
			total_cost: number,
			status: boolean,
			createdAt: string,
		}
		items: [
			{
				img: string
			}
		]
	}


}


const OrderItem = ({ list }: IOrderItem) => {
	let { id, delivery_address, delivery_date, total_cost, status, createdAt } = list.info


	return (
		<div className="order-item">
			<div className="order-left">
				<span>Номер заказа: {id}</span>
				<span>Адресс доставки: {delivery_address}</span>
				<span>Дата доставки: {delivery_date}</span>
				<span>Дата создания заказа: {createdAt}</span>
			</div>
			<div className="order-middle">
				{list.items.map((item, id) => {
					return (
						<img key={id} className='order-photo' src={item.img} alt="" />
					)

				})}
			</div>
			<div className="order-right">
				<span>Статус заказа: {status ? "В пути" : "Выполнен"}</span>
				<span>Стоимость заказа: {total_cost}</span>
			</div>
		</div>
	)
}

export default OrderItem
