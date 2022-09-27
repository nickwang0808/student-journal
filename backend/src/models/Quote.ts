import { Column, HasOne, Model, Table } from "sequelize-typescript";
import Journal from "./Journal";

@Table
class Quote extends Model {
  @Column
  name: string;

  @HasOne(() => Journal)
  journal: Journal;
}

export default Quote;
