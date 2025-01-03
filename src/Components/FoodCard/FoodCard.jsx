import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const FoodCard = ({ item }) => {
	const { image, price, recipe, name, _id } = item;
	const { user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const axiosSecure = useAxiosSecure();

	const handleAddToCart = (food) => {
		if (user && user.email) {
			// TODO: send cart item to database
			console.log(user.email, food);
			const cartItem = {
				menuId: _id,
				email: user.email,
				name,
				image,
				price
			}
			axiosSecure.post('/carts', cartItem)
				.then(res => {
					console.log(res.data);
					if (res.data.insertedId) {
						Swal.fire({
							icon: 'success',
							title: `${name} added successfully to the cart!`,
							timer: 1000,
							showConfirmButton: false
						})
					}
				})
				.catch(err=> console.log(err))
		}
		else {
			Swal.fire({
				title: "You are not logged in",
				text: "Please login to add to the cart",
				icon: "error",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Take me to login!"
			}).then((result) => {
				if (result.isConfirmed) {
					// send the user to the login page
					navigate('/login', { state: location.pathname })
				}
			});
		}
	}
	return (
		<div className="card bg-base-100 w-96 shadow-xl">
			<figure>
				<img
					src={image}
					alt="Shoes" />
			</figure>
			<p className='bg-slate-900 text-white absolute right-3 mr-4 mt-4 p-1'>${price}</p>
			<div className="card-body">
				<h2 className="card-title">{name}</h2>
				<p>{recipe}</p>
				<div className="card-actions justify-end">
					<button
						className="btn btn-outline border-0 border-b-4 border-orange-400 mt-4"
						onClick={() => handleAddToCart(item)}
					>Add to cart</button>
				</div>
			</div>
		</div>
	);
};

export default FoodCard;