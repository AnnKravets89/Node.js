import { FC, PropsWithChildren } from "react";
import { IPizza } from "../../interfaces/pizzaInterface";

interface IProps extends PropsWithChildren {
    pizza: IPizza;
}

const Pizza: FC<IProps> = ({ pizza }) => {
    return (
        <div>
            <p>Name: {pizza.name}</p>
            <p>Price: {pizza.price} USD</p>
            <p>Diameter: {pizza.diameter} cm</p>
        </div>
    );
};

export { Pizza };
