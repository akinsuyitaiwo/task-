
import sequelize from "../config/database";
import { userData } from "./users";
import { orders } from "./order";

const main = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.models.User.bulkCreate(userData);
		await sequelize.models.Order.bulkCreate(orders);

		console.log("Seeding completed");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

main();
