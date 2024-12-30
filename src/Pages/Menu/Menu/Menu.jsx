import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import { useMenu } from '../../../Hooks/useMenu';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';


const Menu = () => {
   const [menu] = useMenu();
   const desserts = menu.filter(item => item.category === 'dessert');
   const soup = menu.filter(item => item.category === 'soup');
   const salad = menu.filter(item => item.category === 'salad');
   const pizza = menu.filter(item => item.category === 'pizza');
   const offered = menu.filter(item => item.category === 'offered');

   return (
      <div>
         <Helmet>
            <title>Bistro | Menu</title>
         </Helmet>
         <Cover title={'Our menu'} img={menuImg}></Cover>
         {/* Today's offer */}
         <SectionTitle subheading={"Don't Miss"} heading={"Today's Offer"}></SectionTitle>
         <MenuCategory items={offered}></MenuCategory>
         {/* dessert section */}
         <MenuCategory items={desserts} title={'Desserts'} coverImg={dessertImg}></MenuCategory>
         {/* Pizza menu */}
         <MenuCategory items={pizza} title={'Pizzas'} coverImg={pizzaImg}></MenuCategory>
         {/* Salads menu */}
         <MenuCategory items={salad} title={'Salads'} coverImg={saladImg}></MenuCategory>
         {/* soup menu */}
         <MenuCategory items={soup} title={'Soups'} coverImg={soupImg}></MenuCategory>
      </div>
   );
};

export default Menu;