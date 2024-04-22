
// import sequelize from "../config/database";
import models from "../model";
import { userData } from "./users";
import { orders } from "./order";

const main = async () => {
	try {
		await models.User.bulkCreate(userData);
		await models.Order.bulkCreate(orders);

		console.log("Seeding completed");
	} catch (error) { 
		console.error(error);
		process.exit(1);
	}
};

main();
