import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';
export default class Order extends Model {
  public id!: string;
  public title!: string;
  public deliveryAdress!: string;
  public payment!: boolean;
  public status!: boolean;


  static associate(models: any) {
    Order.hasOne(models.User, {
      foreignKey: "orderId"
    })
  }
}

  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      // references: {
      //   model: "users",
      //   key: "id"
      // }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryAdress: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: true
  });