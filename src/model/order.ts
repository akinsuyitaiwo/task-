import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';
export default class Order extends Model {
  public id!: string;
  public userId!: string;
  public title!: string;
  public deliveryAdress!: string;
  public payment!: boolean;
  public status!: boolean;
  public active!: boolean;
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
      references: {
        model: "users",
        key: "id"
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryAdress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type : DataTypes.ENUM,
      values: ["pending", "complete", ],
      defaultValue: "pending"
    },
    payment: {
      type: DataTypes.ENUM,
      values: ["card, cash"], 
      defaultValue: "card"
    }, 
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: true
  });