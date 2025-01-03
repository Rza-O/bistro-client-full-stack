import React from 'react';

const FoodCard = ({ item }) => {
   const { image, price, recipe, name } = item;
   const handleAddToCart = (food) => {
      console.log(food);
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