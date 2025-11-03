import { Pizzas } from "../components/pizzas-components/Pizzas";
import { PizzaCreate } from "../components/pizzas-components/PizzaCreate";

const PizzasPage = () => {
    return (
        <div>
            <PizzaCreate/>
            <hr/>
            <Pizzas/>
        </div>
    );
};

export { PizzasPage };
