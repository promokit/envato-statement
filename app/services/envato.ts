import { context } from "~/context/context";
import { OrderTypes } from "~/model/enums";
import { Period } from "~/model/types";

export const fetchData = async  (periodOptions: Period): Promise<any> => {
    const options = {...periodOptions, type: OrderTypes.Sale};

    try {
        const statement = await context.client.private.getStatement(options);
        const salesByMonth = await context.client.private.getMonthlySales();

        return {
            statement,
            salesByMonth
        }
    } catch (error) {
        // renderError('Unable to fetch data from Envato API');
        console.error(error);
    }
}